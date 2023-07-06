package com.main.server.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MemberController {
    private MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/members")
    public Member postMember(@RequestBody MemberDto memberDto) {
        Member member = new Member(memberDto);
        Member registerdMember = memberService.registerMember(member);

        return registerdMember;
    }

    @GetMapping("/members")
    public List<Member> getMembers() {
        List<Member> allMembers = memberService.findAllMembers();

        return allMembers;
    }

    @GetMapping("/members/{member-Id}")
    public Member getMember(@PathVariable("member-Id") long memberId) {
        Member foundMember = memberService.findMember(memberId);

        return foundMember;
    }

    @PatchMapping("/members/{member-Id}")
    public Member patchMember(@PathVariable("member-Id") long memberId,
                              @RequestBody MemberDto memberDto) {
        Member member = new Member(memberDto);
        Member updateMember = memberService.updateMember(memberId, member);

        return updateMember;
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/members/{member-Id}")
    public void deleteMember(@PathVariable("member-Id") long memberId) {
        memberService.terminateMember(memberId);
    }
}
