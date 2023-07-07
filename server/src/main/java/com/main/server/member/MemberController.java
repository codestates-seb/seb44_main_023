package com.main.server.member;

import com.main.server.member.dto.PatchDto;
import com.main.server.member.dto.ResponseDto;
import com.main.server.member.dto.SignUpDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @PatchMapping("/members/{member-Id}")
    public ResponseDto patchMember(@PathVariable("member-Id") long memberId,
                              @RequestBody PatchDto patchDto) {
        Member member = new Member(patchDto);
        Member updateMember = memberService.updateMember(memberId, member);

        return new ResponseDto(updateMember);
    }

    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/members/{member-Id}/profile-image")
    public Member uploadProfileImage(@PathVariable("member-Id") long memberId,
                                     @RequestParam(value = "file") MultipartFile file,
                                     @RequestParam("uploadPath") String uploadPath) {

        Member uploadImage = memberService.uploadProfileImage(memberId, file, uploadPath);

        return uploadImage;

    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/members/{member-Id}")
    public void deleteMember(@PathVariable("member-Id") long memberId) {
        memberService.terminateMember(memberId);
    }
}
