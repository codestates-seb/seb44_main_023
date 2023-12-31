package com.main.server.member;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MemberService {
    private MemberRepository memberRepository;
    private PasswordEncoder passwordEncoder;
//    private static final String FILE_UPLOAD_PATH = "FILE_UPLOAD_PATH";

    @Autowired
    public MemberService(MemberRepository memberRepository,
                         PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Member registerMember(Member member) {
        String memberEmail = member.getEmail();
        Optional<Member> optionalMember = memberRepository.findByEmail(memberEmail);

        if (optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_ALREADY_USED);
        }

        String memberNickname = member.getNickname();
        Optional<Member> optionalNickname = memberRepository.findByNickname(memberNickname);

        if (optionalNickname.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.NICKNAME_ALREADY_USED);
        }

        String encodedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encodedPassword);
        member.setRegisteredAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));

        Member registeredMember = memberRepository.save(member);

        return registeredMember;
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

    public Member findMemberByNickname(String nickname) {
        return memberRepository.findByNickname(nickname)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public Member updateMember(long memberId, Member member) {
        Member foundMember = findMember(memberId);

        if (foundMember != null) {
            String newNickname = member.getNickname();

            if (!foundMember.isSameNickname(newNickname)) {
                // 닉네임이 변경된 경우에만 중복 체크를 수행
                if (memberRepository.existsByNickname(newNickname)) {
                    throw new BusinessLogicException(ExceptionCode.NICKNAME_ALREADY_USED);
                }
                foundMember.setNickname(newNickname);
            }
        }

        Member updatedMember = memberRepository.save(foundMember);
        return updatedMember;
    }

    public Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }


    // 비밀번호 변경
        public boolean updatePassword(long memberId, String password, String newPassword) {
            Member foundMember = findMember(memberId);

            if (foundMember != null && passwordEncoder.matches(password, foundMember.getPassword())) {
                if (!newPassword.equals(password)) {
                    String encodedNewPassword = passwordEncoder.encode(newPassword);
                    if (passwordEncoder.matches(newPassword, foundMember.getPassword())) {
                        throw new BusinessLogicException(ExceptionCode.SAME_CURRENT_PASSWORD);
                    }
                    foundMember.setPassword(encodedNewPassword);
                    memberRepository.save(foundMember);
                    return true;
                } else {
                    throw new BusinessLogicException(ExceptionCode.SAME_CURRENT_PASSWORD);
                }
            } else {
                throw new BusinessLogicException(ExceptionCode.INVALID_PASSWORD_FORMAT);
            }

        }

    public void terminateMember(long memberId, String password) {
        Member foundMember = findMember(memberId);
        if (passwordEncoder.matches(password, foundMember.getPassword())) {

            // 비밀번호가 일치하는 경우
            foundMember.setTerminatedAt(LocalDateTime.now());
            foundMember.setTerminated(true);

            memberRepository.save(foundMember);
        }
        else {
            // 비밀번호가 일치하지 않는 경우
            throw new IllegalArgumentException("패스워드가 일치하지 않습니다.");
        }
    }

    // 이미지 업로드
    public void createProfileImage(long memberId, MultipartFile file) throws Exception {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid member ID"));

        long maxSizeBytes = 1 * 1024 * 1024; // 1MB
        long minSizeBytes = 5 * 1024; // 5KB
        long fileSize = file.getSize();

        if (fileSize < minSizeBytes || fileSize > maxSizeBytes) {
            throw new IllegalArgumentException("Invalid file size. Please upload an image between 5KB and 1MB.");
        }

        // 파일 업로드 처리 로직
        String fileName = file.getOriginalFilename();
        String fileUploadPath = System.getenv("FILE_UPLOAD_PATH");
        Path filePath = Paths.get(fileUploadPath, fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        member.setProfileImage(fileName);
        memberRepository.save(member);
    }

    // 이미지 수정
    public void updateProfileImage(long memberId, MultipartFile file) throws Exception {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid member ID"));

        // 기존 이미지 파일 삭제
        deleteExistingProfileImage(member);

        // 이미지 크기 제한 (최소 5KB, 최대 1MB)
        long maxSizeBytes = 1 * 1024 * 1024; // 1MB
        long minSizeBytes = 5 * 1024; // 5KB
        long fileSize = file.getSize();

        if (fileSize < minSizeBytes || fileSize > maxSizeBytes) {
            throw new BusinessLogicException(ExceptionCode.INVALID_FILE_SIZE);
        }

        // 새로운 이미지 파일 업로드
//        String fileName = file.getOriginalFilename();
//        Path filePath = Path.of("/Users/seonggeon2/Downloads/mainproject/server/uploads/", fileName);
//        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
//
//        member.setProfileImage(fileName);
//        memberRepository.save(member);
//    }
        // 새로운 이미지 파일 업로드
        String fileName = file.getOriginalFilename();
        String fileUploadPath = System.getenv("FILE_UPLOAD_PATH");
        Path filePath = Paths.get(fileUploadPath, fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        member.setProfileImage(fileName);
        memberRepository.save(member);
    }

        // 기존 이미지 파일 삭제
//    private void deleteExistingProfileImage(Member member) {
//        if (member.getProfileImage() != null && !member.getProfileImage().isEmpty()) {
//            String existingImagePath = "/Users/seonggeon2/Downloads/mainproject/server/uploads/"
//                    + member.getProfileImage();
//            Path existingImageFile = Paths.get(existingImagePath);
//            if (Files.exists(existingImageFile)) {
//                try {
//                    Files.delete(existingImageFile);
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
//        }
//    }
        // 기존 이미지 파일 삭제
        private void deleteExistingProfileImage(Member member) {
            if (member.getProfileImage() != null && !member.getProfileImage().isEmpty()) {
                String existingImagePath = System.getenv("FILE_UPLOAD_PATH") + member.getProfileImage();
                Path existingImageFile = Paths.get(existingImagePath);
                if (Files.exists(existingImageFile)) {
                    try {
                        Files.delete(existingImageFile);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }

    // 이미지 조회 메서드 추가
//    public byte[] getProfileImage(long memberId) throws IOException {
//        Member member = memberRepository.findById(memberId)
//                .orElseThrow(() -> new IllegalArgumentException("Invalid member ID"));
//
//        String fileName = member.getProfileImage();
//        if (fileName != null && !fileName.isEmpty()) {
//            Path filePath = Paths.get("/Users/seonggeon2/Downloads/mainproject/server/uploads/", fileName);
//            if (Files.exists(filePath)) {
//                return Files.readAllBytes(filePath);
//            } else {
//                throw new FileNotFoundException("File does not exist: " + fileName);
//            }
//        } else {
//            throw new IllegalStateException("Profile image file name is missing.");
//        }
//    }

    // 이미지 조회 메서드 추가
    public byte[] getProfileImage(long memberId) throws IOException {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid member ID"));

        String fileName = member.getProfileImage();
        if (fileName != null && !fileName.isEmpty()) {
            String fileUploadPath = System.getenv("FILE_UPLOAD_PATH");
            Path filePath = Paths.get(fileUploadPath, fileName);
            if (Files.exists(filePath)) {
                return Files.readAllBytes(filePath);
            } else {
                throw new FileNotFoundException("File does not exist: " + fileName);
            }
        } else {
            throw new IllegalStateException("Profile image file name is missing.");
        }
    }

    // 이미지 삭제
//    public void deleteProfileImage(long memberId) throws IOException {
//        Member member = memberRepository.findById(memberId)
//                .orElseThrow(() -> new IllegalArgumentException("Invalid member ID"));
//
//        if (member.getProfileImage() == null || member.getProfileImage().isEmpty()) {
//            throw new IllegalArgumentException("삭제할 수 있는 이미지가 없습니다.");
//        }
//
//        deleteExistingProfileImage(member);
//
//        member.setProfileImage(null);
//        memberRepository.save(member);
//    }
    // 이미지 삭제
    public void deleteProfileImage(long memberId) throws IOException {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid member ID"));

        if (member.getProfileImage() == null || member.getProfileImage().isEmpty()) {
            throw new IllegalArgumentException("삭제할 수 있는 이미지가 없습니다.");
        }

        deleteExistingProfileImage(member);

        member.setProfileImage(null);
        memberRepository.save(member);
    }

}
