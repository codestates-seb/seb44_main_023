package com.main.server.auth;

import com.main.server.auth.dto.AuthDto;
import com.main.server.auth.dto.AuthResponse;
import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.member.Member;
import com.main.server.member.MemberService;
import com.main.server.security.JwtTokenizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = "*")
@RestController
public class AuthController {

    private AuthService authService;
    private JwtTokenizer jwtTokenizer;
    private MemberService memberService;
    private Set<String> tokenBlacklist = new HashSet<>();


    @Autowired
    public AuthController(AuthService authService,
                          JwtTokenizer jwtTokenizer,
                          MemberService memberService,
                          Set<String> tokenBlacklist) {
        this.authService = authService;
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
        this.tokenBlacklist = tokenBlacklist;
    }

    @PostMapping("/auths")
    public ResponseEntity<?> postAuth(@Valid @RequestBody AuthDto authDto,
                                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // 유효성 검증에 실패한 경우 에러 메시지를 처리하고 응답을 구성한다.
            StringBuilder errorMessage = new StringBuilder();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMessage.append(error.getDefaultMessage())
                        .append("; \n");
            }
            return ResponseEntity.badRequest().body(errorMessage.toString());
        }

        try {
            authService.authenticate(authDto.getEmail(), authDto.getPassword());
            AuthResponse authResponse = authService.processLogin(authDto.getEmail());

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + authResponse.getAccessToken());
            headers.add("X-Refresh-Token", authResponse.getRefreshToken());
            return ResponseEntity.ok().headers(headers).body("로그인에 성공했습니다");
        } catch (BusinessLogicException e) {
            return ResponseEntity.status(e.getExceptionCode().getStatus())
                    .body(e.getExceptionCode().getMessage());
        }
    }

    // 로그아웃
    // 로그아웃
    @DeleteMapping("/logouts")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authorizationHeader,
                                    HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            // 토큰 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            // AccessToken 무효화
            authService.invalidateToken(token);

            if (refreshToken != null) {
                // RefreshToken 무효화
                authService.invalidateToken(refreshToken);
            }

            return ResponseEntity.ok("로그아웃에 성공하였습니다");
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
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


