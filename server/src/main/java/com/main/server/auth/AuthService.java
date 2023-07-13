package com.main.server.auth;

import com.main.server.member.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.main.server.member.Member;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private MemberRepository memberRepository;

    private PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(MemberRepository memberRepository,
                       PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean authenticate(String email, String password) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED,"로그인에 실패했습니다"));

        String savedPassword = member.getPassword();
        boolean passwordMatches = passwordEncoder.matches(password, savedPassword);

        if (!passwordMatches)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인에 실패했습니다");

        return true;
    }
}
