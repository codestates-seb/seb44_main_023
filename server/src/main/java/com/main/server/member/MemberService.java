package com.main.server.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.swing.text.html.Option;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

            foundMember.setNickname(member.getNickname());
            foundMember.setPassword(member.getPassword());
            foundMember.setProfileImagePath(member.getProfileImagePath());
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

    public Member uploadProfileImage(long memberId, MultipartFile file, String uploadPath) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found with ID: " + memberId));

        try {
            // 업로드할 디렉토리 생성 (없는 경우)
            String directoryPath = "/Downloads/mainproject/server/uploads/";
            String filename = "2048.jpeg";

            // 새로운 파일명 생성
            String originalFilename = file.getOriginalFilename();
            String uniqueFilename = UUID.randomUUID().toString() + "_" + originalFilename;

            // 파일을 저장할 경로 생성
            String filePath = uploadPath + File.separator + uniqueFilename;

            // 파일 저장
            File targetFile = new File(filePath);
            file.transferTo(targetFile);

            // 기존 파일 삭제 (옵션)
            if (member.getProfileImagePath() != null) {
                File existingFile = new File(member.getProfileImagePath());
                existingFile.delete();
            }

            // 프로필 이미지 경로 업데이트
            member.setProfileImagePath(filePath);

            return memberRepository.save(member);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload profile image", e);
        }
    }

}
