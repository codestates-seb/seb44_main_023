package com.main.server.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.main.server.auth.AuthController;
import com.main.server.member.Member;
import com.main.server.member.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.PostConstruct;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;


@Component
public class JwtTokenizer {

    @Value("${jwt.key.secret}")
    private String secretKey;

    private Algorithm algorithm;
    private JWTVerifier jwtVerifier;

    @Value("${jwt.token.access.expiration:86400000}") // 기본값: 1일 (밀리초 단위)
    private long accessTokenExpirationTime;
    @Value("${jwt.token.refresh.expiration:1209600000}") // 기본값: 2주 (밀리초 단위)
    private long refreshTokenExpirationTime;

    @Autowired
    private TokenBlacklist tokenBlacklist;

    @Autowired
    private MemberRepository memberRepository;
    private Set<String> refreshTokenBlacklist = new HashSet<>();

    @PostConstruct
    public void init() {
        algorithm = Algorithm.HMAC256(secretKey);
        jwtVerifier = JWT.require(algorithm).build();
    }

    public String generateToken(String email, long memberId, long expirationTime) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + expirationTime);

        String generatedToken = JWT.create()
                .withSubject(email)
                .withClaim("memberId", String.valueOf(memberId))
                .withClaim("email", email)
                .withIssuedAt(now)
                .withExpiresAt(expirationDate)
                .sign(algorithm);

        return generatedToken;
    }

    public String generateAccessToken(String email, long memberId) {
        return generateToken(email, memberId, accessTokenExpirationTime);
    }

    public String generateRefreshToken(String email, long memberId) {
        String existingRefreshToken = refreshTokenBlacklist.stream()
                .filter(token -> validateRefreshToken(token))
                .findFirst()
                .orElse(null);

        if (existingRefreshToken != null) {
            return existingRefreshToken;
        }

        return generateToken(email, memberId, refreshTokenExpirationTime);
    }

    public boolean validateToken(String token) {
        try {
            // 블랙리스트에 있는 토큰인지 확인
            if (tokenBlacklist.isTokenBlacklisted(token)) {
                return false;
            }

            DecodedJWT decodedJWT = jwtVerifier.verify(token);
            Date expirationDate = decodedJWT.getExpiresAt();
            return expirationDate != null && expirationDate.after(new Date());
        } catch (JWTVerificationException e) {
            return false;
        }
    }

    public boolean validateRefreshToken(String token) {
        // RefreshToken이 블랙리스트에 있는 경우에도 검증을 통과하도록 수정
        return validateToken(token);
    }

    public long getAccessTokenExpirationTime() {
        return accessTokenExpirationTime;
    }

    public long getRefreshTokenExpirationTime() {
        return refreshTokenExpirationTime;
    }

    public long getMemberIdFromToken(String token) {
        // "Bearer " 프리픽스 제거
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        // System.out.println("Token: " + token); // 토큰 값 출력
        DecodedJWT decodedJWT = jwtVerifier.verify(token);
        String memberIdString = extractMemberIdFromToken(decodedJWT);

        if (memberIdString == null || memberIdString.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "토큰 내에서 멤버 ID를 찾을 수 없습니다");
        }
        try {
            return Long.parseLong(memberIdString);
        } catch (NumberFormatException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "토큰 내에 잘못된 멤버 ID가 있습니다");
        }
    }
    public Member getMemberFromToken(String token) {
        // "Bearer " 프리픽스 제거
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        long memberId = getMemberIdFromToken(token);
        return memberRepository.findById(memberId).orElse(null);
    }


    private String extractMemberIdFromToken(DecodedJWT decodedJWT) {
        try {
            // 토큰 파싱하여 memberId 추출
            Claim memberIdClaim = decodedJWT.getClaim("memberId");

            if (memberIdClaim.isNull()) {
                return null;
            }
            return memberIdClaim.asString();
        } catch (JWTVerificationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid token");
        }
    }

    public String extractEmailFromToken(String token) {
        try {
            // Parse the token and extract the email
            DecodedJWT decodedJWT = jwtVerifier.verify(token);
            Claim emailClaim = decodedJWT.getClaim("email");
            if (emailClaim.isNull()) {
                return null;
            }
            return emailClaim.asString();
        } catch (JWTVerificationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid token");
        }
    }


}
