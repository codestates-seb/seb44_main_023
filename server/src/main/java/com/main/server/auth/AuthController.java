package com.main.server.auth;

import com.main.server.auth.dto.AuthDto;
import com.main.server.auth.dto.AuthResponse;
import com.main.server.security.JwtTokenizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@RestController
public class AuthController {

    private AuthService authService;
    private JwtTokenizer jwtTokenizer;

    private Set<String> tokenBlacklist = new HashSet<>();

    @Autowired
    public AuthController(AuthService authService,
                          JwtTokenizer jwtTokenizer) {
        this.authService = authService;
        this.jwtTokenizer = jwtTokenizer;

    }

//    @PostMapping("/auths")
//    public ResponseEntity<AuthResponse> postAuth(@Valid @RequestBody AuthDto authDto) {
//
//        String email = authDto.getEmail();
//        String password = authDto.getPassword();
//
//        authService.authenticate(email, password);
//
//        String accessToken = jwtTokenizer.generateAccessToken(email);
//        String refreshToken = jwtTokenizer.generateRefreshToken(email);
//
//        AuthResponse authResponse = new AuthResponse(accessToken, refreshToken);
//
//        return ResponseEntity.ok(authResponse);
//    }

    @PostMapping("/auths")
    public ResponseEntity<?> postAuth(@Valid @RequestBody AuthDto authDto
            , BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // 유효성 검증에 실패한 경우 에러 메시지를 처리하고 응답을 구성한다.
            StringBuilder errorMessage = new StringBuilder();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMessage.append(error.getField())
                        .append(": ")
                        .append(error.getDefaultMessage())
                        .append("; \n");
            }
            // 에러 메시지를 포스트맨으로 보내기 위해 ResponseEntity를 사용한다.
            return ResponseEntity.badRequest().body(errorMessage.toString());
        }

      String email = authDto.getEmail();
      String password = authDto.getPassword();
      
       authService.authenticate(email, password);
      
      String accessToken = jwtTokenizer.generateAccessToken(email);
        String refreshToken = jwtTokenizer.generateRefreshToken(email);
      
      AuthResponse authResponse = new AuthResponse(accessToken, refreshToken);
      
      return ResponseEntity.ok(authResponse);
    }

    @DeleteMapping("/logouts")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authorizationHeader) {
        String accessToken = extractAccessToken(authorizationHeader);

        // 토큰 유효성 검사
        if (!jwtTokenizer.validateToken(accessToken)) {
            return ResponseEntity.badRequest().body("Invalid Access Token");
        }

        // 로그아웃한 토큰을 블랙리스트에 추가
        tokenBlacklist.add(accessToken);

        return ResponseEntity.ok("Logged out successfully");
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authorizationHeader) {
        String accessToken = extractAccessToken(authorizationHeader);

        // 토큰 유효성 검사 및 블랙리스트 확인
        if (!jwtTokenizer.validateToken(accessToken) || tokenBlacklist.contains(accessToken)) {
            return ResponseEntity.badRequest().body("Invalid Access Token");
        }

        return ResponseEntity.ok("Valid Access Token");
    }

    private String extractAccessToken(String authorizationHeader) {
        return authorizationHeader.replace("Bearer ", "");

    }
}


