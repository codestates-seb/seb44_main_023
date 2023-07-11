package com.main.server.member;

import com.main.server.member.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class MemberController {
    private MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/members")
    public ResponseDto postMember(@Valid @RequestBody SignUpDto signUpDto) {
        Member member = new Member(signUpDto);
        Member registeredMember = memberService.registerMember(member);

        return new ResponseDto(registeredMember);
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
    public ResponseDto patchMember(@PathVariable("member-Id") long memberId,
                                   @RequestBody NicknameDto nicknameDto) {
        Member member = new Member(nicknameDto);
        Member updateMember = memberService.updateMember(memberId, member);

        return new ResponseDto(updateMember);
    }

    // 비밀번호 변경
    @PostMapping("/members/{member-Id}/password")
    public ResponseEntity<String> changePassword(@PathVariable("member-Id") long memberId,
                                                 @RequestBody PasswordDto passwordDto) {
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
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update profile image.");
        }
    }


}
