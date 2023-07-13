package com.main.server.member;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.member.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.util.MimeTypeUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
public class MemberController {
    private MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/members")
    public ResponseEntity<?> postMember(@Valid @RequestBody SignUpDto signUpDto
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

        Member member = new Member(signUpDto);
        Member registeredMember = memberService.registerMember(member);

        ResponseDto responseDto = new ResponseDto(registeredMember);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
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
        if (!nicknameDto.getNickname().matches("^[ㄱ-ㅎ가-힣a-zA-Z0-9-_]{2,10}$")) {
            return ResponseEntity.badRequest().body("닉네임은 특수문자를 제외한 2~10자리여야 합니다.");
        }

        Member existingMember = memberService.findMember(memberId);
        if (existingMember == null) {
            return ResponseEntity.badRequest().body("Failed update Nickname");
        }

        String newNickname = nicknameDto.getNickname();
        String currentNickname = existingMember.getNickname();

        if (newNickname.equals(currentNickname)) {
            return ResponseEntity.badRequest().body("현재 닉네임과 동일합니다.");
        }

        Member memberWithNewNickname = memberService.findMemberByNickname(newNickname);
        if (memberWithNewNickname != null) {
            return ResponseEntity.badRequest().body("이미 사용 중인 닉네임입니다.");
        }

        existingMember.setNickname(newNickname);
        Member updatedMember = memberService.updateMember(memberId, existingMember);

        if (updatedMember != null) {
            return ResponseEntity.ok("Succeed Update Nickname");
        }
        else {
            return ResponseEntity.badRequest().body("Failed Update Nickname");
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
        if (passwordDto.getNewPassword().equals(passwordDto.getPassword())) {
            return ResponseEntity.badRequest().body(ExceptionCode.INVALID_PASSWORD.getMessage());
        }

        boolean passwordChanged = memberService.updatePassword(memberId,
                                                               passwordDto.getPassword(),
                                                               passwordDto.getNewPassword());
        if (passwordChanged) {
            return ResponseEntity.ok("Password changed successfully!");
        }
        else {
            return ResponseEntity.badRequest().body("Failed to change password.");
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

}

