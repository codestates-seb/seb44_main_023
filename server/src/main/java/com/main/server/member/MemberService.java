package com.main.server.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private MemberRepository memberRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public MemberService(MemberRepository memberRepository,
                         PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Member registerMember(Member member) {
        String memberEmail = member.getEmail();
        Optional<Member> optionalMember = memberRepository.findByEmail(memberEmail);

        if (optionalMember.isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT);

        String encodedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encodedPassword);
        member.setRegisteredAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));

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


        if (foundMember != null && passwordEncoder.matches(password, foundMember.getPassword())) {
            String encodedNewPassword = passwordEncoder.encode(newPassword);

            foundMember.setPassword(encodedNewPassword);

            Member updatePassword = memberRepository.save(foundMember);
            return true;
        }
        return false;
    }

    public void terminateMember(long memberId, String password) {
        Member foundMember = findMember(memberId);
        if (passwordEncoder.matches(password, foundMember.getPassword())) {
            foundMember.setTerminatedAt(LocalDateTime.now());
            foundMember.setTerminated(true);
            memberRepository.save(foundMember);
        }
        else {
            throw new IllegalArgumentException("패스워드가 일치하지 않습니다.");
        }
    }

}
