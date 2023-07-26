package com.main.server.auth;

import com.main.server.auth.dto.AuthResponse;
import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.member.MemberRepository;
import com.main.server.security.JwtTokenizer;
import com.main.server.security.TokenBlacklist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.main.server.member.Member;


@Service
public class AuthService {

    private MemberRepository memberRepository;

    private PasswordEncoder passwordEncoder;
    private JwtTokenizer jwtTokenizer;
    private TokenBlacklist tokenBlacklist;

    @Autowired
    public AuthService(MemberRepository memberRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenizer jwtTokenizer,
                       TokenBlacklist tokenBlacklist) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenizer = jwtTokenizer;
        this.tokenBlacklist = tokenBlacklist;
    }

    public boolean authenticate(String email, String password) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.EMAIL_NOT_REGISTERED));

        String savedPassword = member.getPassword();
        boolean passwordMatches = passwordEncoder.matches(password, savedPassword);

        if (!passwordMatches)
            throw new BusinessLogicException(ExceptionCode.PASSWORD_DOES_NOT_MATCH);

        return true;
    }
    public AuthResponse processLogin(String email) {
        // 회원 정보 가져오기
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.EMAIL_NOT_REGISTERED));

        // AccessToken 발급
        String accessToken = jwtTokenizer.generateAccessToken(email, member.getMemberId());

        // AccessToken 유효성 검사
        if (!jwtTokenizer.validateToken(accessToken)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_ACCESS_TOKEN);
        }

        // Refresh Token 발급 (유효한 토큰이 있는 경우에는 새로 발급하지 않음)
        String existingRefreshToken = member.getRefreshToken();
        String refreshToken;
        if (existingRefreshToken == null || !jwtTokenizer.validateToken(existingRefreshToken)) {
            refreshToken = jwtTokenizer.generateRefreshToken(email, member.getMemberId());
            member.setRefreshToken(refreshToken); // 회원 정보에 Refresh 토큰 저장
            memberRepository.save(member);
        } else {
            refreshToken = existingRefreshToken;
        }

        // RefreshToken 유효성 검사
        if (!jwtTokenizer.validateToken(refreshToken)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_REFRESH_TOKEN);
        }

        return new AuthResponse(accessToken, refreshToken, member.getMemberId());
    }

    public void invalidateToken(String accessToken) {
        // 로그아웃한 토큰을 블랙리스트에 추가
        tokenBlacklist.addToBlacklist(accessToken);
    }

    public boolean validateToken(String accessToken) {
        // 블랙리스트에 없고, JWT 토큰이 유효하면 참을 반환
        return !tokenBlacklist.isTokenBlacklisted(accessToken) && jwtTokenizer.validateToken(accessToken);
    }

    public boolean isTokenBlacklisted(String accessToken) {
        return tokenBlacklist.isTokenBlacklisted(accessToken);
    }


}
