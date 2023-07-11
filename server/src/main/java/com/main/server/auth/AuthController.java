package com.main.server.auth;

import com.main.server.auth.dto.AuthDto;
import com.main.server.auth.dto.AuthResponse;
import com.main.server.security.JwtTokenizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private AuthService authService;
    private JwtTokenizer jwtTokenizer;

    @Autowired
    public AuthController(AuthService authService,
                          JwtTokenizer jwtTokenizer) {
        this.authService = authService;
        this.jwtTokenizer = jwtTokenizer;
    }

    @PostMapping("/auths")
    public AuthResponse postAuth(@RequestBody AuthDto authDto) {
        String email = authDto.getEmail();
        String password = authDto.getPassword();

        authService.authenticate(email, password);

        String accessToken = jwtTokenizer.generateAccessToken(email);
        String refreshToken = jwtTokenizer.generateRefreshToken(email);

        return new AuthResponse(accessToken, refreshToken);

    }
}


