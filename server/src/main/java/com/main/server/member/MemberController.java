package com.main.server.member;

import com.main.server.auth.AuthService;
import com.main.server.auth.dto.AuthResponse;
import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.member.dto.*;
import com.main.server.security.JwtTokenizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.util.MimeTypeUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
public class MemberController {
    private MemberService memberService;
    private JwtTokenizer jwtTokenizer;
    private AuthService authService;

    @Autowired
    public MemberController(MemberService memberService, AuthService authService, JwtTokenizer jwtTokenizer) {
        this.memberService = memberService;
        this.jwtTokenizer = jwtTokenizer;
        this.authService = authService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/members")
    public ResponseEntity<?> postMember(@RequestBody SignUpDto signUpDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            FieldError emailError = bindingResult.getFieldError("email");
            FieldError nicknameError = bindingResult.getFieldError("nickname");
            FieldError passwordError = bindingResult.getFieldError("password");

            if (emailError != null) {
                throw new BusinessLogicException(ExceptionCode.INVALID_EMAIL);
            }

            if (nicknameError != null) {
                throw new BusinessLogicException(ExceptionCode.INVALID_NICKNAME);
            }

            if (passwordError != null) {
                throw new BusinessLogicException(ExceptionCode.INVALID_PASSWORD_FORMAT);
            }
        }

        try {
            // 회원 등록 로직
            Member member = new Member(signUpDto);
            Member registeredMember = memberService.registerMember(member);

            // 최초 Refresh 토큰 발급
            String refreshToken = jwtTokenizer.generateRefreshToken(registeredMember.getEmail());
            registeredMember.setRefreshToken(refreshToken); // 회원 정보에 Refresh 토큰 저장

            // AccessToken 발급
            String accessToken = jwtTokenizer.generateAccessToken(registeredMember.getEmail());

            // 회원 정보 업데이트
            memberService.updateMember(registeredMember.getMemberId(), registeredMember);

            AuthResponse authResponse = new AuthResponse(accessToken, refreshToken);

            // HttpHeaders 객체를 생성하여 AccessToken과 RefreshToken을 Headers에 추가
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + accessToken);
            headers.add("X-Refresh-Token", refreshToken);
            return ResponseEntity.ok().headers(headers).body("회원가입에 성공했습니다");
        } catch (BusinessLogicException e) {
            return ResponseEntity.status(e.getExceptionCode().getStatus())
                    .body(e.getExceptionCode().getMessage());
        }
    }

    @ExceptionHandler(BusinessLogicException.class)
    public ResponseEntity<String> handleBusinessLogicException(BusinessLogicException e) {
        return ResponseEntity.status(e.getExceptionCode().getStatus())
                .body(e.getExceptionCode().getMessage());
    }


    @GetMapping("/members")
    public List<ResponseDto> getMembers() {
        List<Member> allMembers = memberService.findAllMembers();

        return allMembers.stream()
                .map(member -> new ResponseDto(member))
                .collect(Collectors.toList());

    }

    @GetMapping("/members/{member-Id}")
    public ResponseDto getMember(@PathVariable("member-Id") long memberId) {
        Member foundMember = memberService.findMember(memberId);

        return new ResponseDto(foundMember);
    }

    // 닉네임 변경
    @PatchMapping("/members/{member-Id}/nickname")
    public ResponseEntity<String> patchMember(@PathVariable("member-Id") long memberId,
                                              @RequestBody NicknameDto nicknameDto) {

        // 닉네임 유효성 검증
        try {
            // 닉네임 유효성 검증
            if (!nicknameDto.getNickname().matches("^[ㄱ-ㅎ가-힣a-zA-Z0-9-_]{2,10}$")) {
                throw new BusinessLogicException(ExceptionCode.INVALID_NICKNAME_FORMAT);
            }

            Member member = new Member(nicknameDto);
            Member updatedMember = memberService.updateMember(memberId, member);
            return ResponseEntity.ok().body("Succeed Update Nickname");
        } catch (BusinessLogicException e) {
            return ResponseEntity.status(e.getExceptionCode().getStatus())
                    .body(e.getExceptionCode().getMessage());
        }
    }

    // 비밀번호 변경
    @PatchMapping("/members/{member-Id}/password")
    public ResponseEntity<String> changePassword(@PathVariable("member-Id") long memberId,
                                                 @Valid @RequestBody PasswordDto passwordDto,
                                                 BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // 유효성 검사 오류 처리
            String errorMessage = bindingResult.getFieldError().getDefaultMessage();
            return ResponseEntity.badRequest().body(errorMessage);
        }

        try {
            boolean passwordChanged = memberService.updatePassword(memberId,
                    passwordDto.getPassword(),
                    passwordDto.getNewPassword());
            if (passwordChanged) {
                return ResponseEntity.ok("Password changed successfully!");
            } else {
                return ResponseEntity.badRequest().body("Failed to change password.");
            }
        } catch (BusinessLogicException e) {
            if (e.getExceptionCode() == ExceptionCode.SAME_CURRENT_PASSWORD) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("현재 비밀번호와 일치합니다.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getExceptionCode().getMessage());
            }
        }
    }

    // 로그아웃
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/members/{member-Id}")
    public void deleteMember(@PathVariable("member-Id") long memberId,
                             @RequestParam("password") String password) {
        memberService.terminateMember(memberId, password);
    }

    // 이미지 업로드
    @PostMapping("/members/{member-Id}/profile-image")
    public ResponseEntity<String> uploadProfileImage(@PathVariable("member-Id") long memberId,
                                                     @RequestParam("file") MultipartFile file) {
        try {
            memberService.createProfileImage(memberId, file);
            return ResponseEntity.ok("Profile image uploaded successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile image.");
        }
    }

    // 이미지 수정
    @PatchMapping("/members/{member-Id}/profile-image")
    public ResponseEntity<String> updateProfileImage(@PathVariable("member-Id") long memberId,
                                                     @RequestParam("file") MultipartFile file) {
        try {
            memberService.updateProfileImage(memberId, file);
            return ResponseEntity.ok("Profile image updated successfully!");
        } catch (BusinessLogicException e) {
            return ResponseEntity.status(e.getExceptionCode().getStatus())
                    .body(e.getExceptionCode().getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update profile image.");
        }
    }
  
    // 이미지 조회
    @GetMapping("/members/{member-Id}/profile-image")
    public ResponseEntity<byte[]> getProfileImage(@PathVariable("member-Id") long memberId) {
        try {
            byte[] imageBytes = memberService.getProfileImage(memberId);
            if (imageBytes != null) {
                String fileName = "profile-image.jpg"; // 기본적으로 JPEG로 가정
                // 파일 확장자에 따라 적절한 MediaType 설정
                String mimeType = MediaTypeFactory.getMediaType(fileName)
                        .orElse(MediaType.IMAGE_JPEG).toString();

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.parseMediaType(mimeType));
                return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve profile image.".getBytes());
        }
    }

    // 이미지 삭제
    @DeleteMapping("/members/{member-Id}/profile-image")
    public ResponseEntity<String> deleteProfileImage(@PathVariable("member-Id") long memberId) {
        try {
            memberService.deleteProfileImage(memberId);
            return ResponseEntity.ok("Profile image deleted successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete profile image.");
        }
    }

}

