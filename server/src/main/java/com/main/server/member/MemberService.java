package com.main.server.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.swing.text.html.Option;
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

    public Member updateMember(long memberId, Member member) {
        Member foundMember = findMember(memberId);

        if (foundMember != null) {
            foundMember.setEmail(member.getEmail());
            foundMember.setNickname(member.getNickname());
            foundMember.setPassword(member.getPassword());
        }
        Member updateMember = memberRepository.save(foundMember);

        return updateMember;
    }

    public void terminateMember(long memberId) {
        Member foundMember = findMember(memberId);

        foundMember.setTerminatedAt(LocalDateTime.now());
        foundMember.setTerminated(true);

        memberRepository.save(foundMember);
    }

}
