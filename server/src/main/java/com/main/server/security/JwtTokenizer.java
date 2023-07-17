package com.main.server.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.main.server.auth.AuthController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

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
    private Set<String> refreshTokenBlacklist = new HashSet<>();

    @PostConstruct
    public void init() {
        algorithm = Algorithm.HMAC256(secretKey);
        jwtVerifier = JWT.require(algorithm).build();
    }

    public String generateToken(String subject, long expirationTime) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + expirationTime);

        String generatedToken = JWT.create()
                .withSubject(subject)
                .withIssuedAt(now)
                .withExpiresAt(expirationDate)
                .sign(algorithm);

        return generatedToken;
    }

    public String generateAccessToken(String subject) {
        return generateToken(subject, accessTokenExpirationTime);
    }

    public String generateRefreshToken(String subject) {
        String existingRefreshToken = refreshTokenBlacklist.stream()
                .filter(token -> validateToken(token))
                .findFirst()
                .orElse(null);

        if (existingRefreshToken != null) {
            return existingRefreshToken;
        }

        return generateToken(subject, refreshTokenExpirationTime);
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
}
