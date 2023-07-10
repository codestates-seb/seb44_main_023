package com.main.server.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member registerMember(Member member) {
        String memberEmail = member.getEmail();
        Optional<Member> optionalMember = memberRepository.findByEmail(memberEmail);

        if (optionalMember.isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT);

        Member registerdMember = memberRepository.save(member);

        return registerdMember;
    }

    public List<Member> findAllMembers() {
        List<Member> allMembers = memberRepository.findAll();

        return allMembers;
    }

    public Member findMember(long memberId) {

        Member foundMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return foundMember;
    }

    // 닉네임 변경
    public Member updateMember(long memberId, Member member) {
        Member foundMember = findMember(memberId);

        if (foundMember != null) {

            foundMember.setNickname(member.getNickname());
        }
        Member updateMember = memberRepository.save(foundMember);

        return updateMember;
    }

    // 비밀번호 변경
    public boolean updatePassword(long memberId, String password, String newPassword) {
        Member foundMember = findMember(memberId);

        if (foundMember != null && foundMember.getPassword().equals(password)) {
            foundMember.setPassword(newPassword);

            Member updatePassword = memberRepository.save(foundMember);
            return true;
        }
        return false;
    }

    public void terminateMember(long memberId) {
        Member foundMember = findMember(memberId);

        foundMember.setTerminatedAt(LocalDateTime.now());
        foundMember.setTerminated(true);
        memberRepository.save(foundMember);
    }

}
