package com.main.server.member;

import com.main.server.auth.AuthService;
import com.main.server.auth.dto.AuthResponse;
import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.member.dto.*;
import com.main.server.security.JwtTokenizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class MemberController {
    private MemberService memberService;
    private JwtTokenizer jwtTokenizer;
    private AuthService authService;
    private MemberRepository memberRepository;


    @Autowired
    public MemberController(MemberService memberService, AuthService authService, JwtTokenizer jwtTokenizer, MemberRepository memberRepository) {
        this.memberService = memberService;
        this.jwtTokenizer = jwtTokenizer;
        this.authService = authService;
        this.memberRepository = memberRepository;
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
            String refreshToken = jwtTokenizer.generateRefreshToken(registeredMember.getEmail(), registeredMember.getMemberId());
            registeredMember.setRefreshToken(refreshToken); // 회원 정보에 Refresh 토큰 저장

            // AccessToken 발급
            String accessToken = jwtTokenizer.generateAccessToken(registeredMember.getEmail(), registeredMember.getMemberId());


            // 회원 정보 업데이트
            memberService.updateMember(registeredMember.getMemberId(), registeredMember);

            AuthResponse authResponse = new AuthResponse(accessToken, refreshToken, registeredMember.getMemberId());


            return ResponseEntity.status(HttpStatus.CREATED).body(authResponse);
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


    @GetMapping("/member")
    public ResponseEntity<List<ResponseDto>> getMembers(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            // AccessToken 유효성 검사
            if (!jwtTokenizer.validateToken(token)) {
                // AccessToken이 만료된 경우 RefreshToken으로 갱신 시도
                if (refreshToken != null && jwtTokenizer.validateRefreshToken(refreshToken)) {
                    // Refresh Token 검증 및 memberId 식별
                    long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

                    // memberId를 사용하여 회원 정보 확인
                    Member verifiedMember = memberService.findMember(memberId);

                    if (verifiedMember == null) {
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
                    }

                    // 새로운 AccessToken 발급
                    String newAccessToken = jwtTokenizer.generateAccessToken(verifiedMember.getEmail(), verifiedMember.getMemberId());

                    // 새로운 AccessToken으로 인증 및 인가 처리
                    List<Member> allMembers = memberService.findAllMembers();
                    List<ResponseDto> responseDtoList = allMembers.stream()
                            .map(member -> new ResponseDto(member))
                            .collect(Collectors.toList());

                    // 새로운 AccessToken을 헤더에 담아서 응답
                    HttpHeaders headers = new HttpHeaders();
                    headers.add("Authorization", "Bearer " + newAccessToken);
                    return new ResponseEntity<>(responseDtoList, headers, HttpStatus.OK);
                } else {
                    // RefreshToken이 만료되었을 경우, 새로운 로그인 요청
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다. 다시 로그인해주세요");
                }
            }

            // AccessToken이 유효한 경우
            // memberId를 사용하여 회원 정보 확인
            long memberId = jwtTokenizer.getMemberIdFromToken(token);
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            List<Member> allMembers = memberService.findAllMembers();
            List<ResponseDto> responseDtoList = allMembers.stream()
                    .map(member -> new ResponseDto(member))
                    .collect(Collectors.toList());

            // 기존의 AccessToken을 헤더에 담아서 응답
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + token);
            return new ResponseEntity<>(responseDtoList, headers, HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }



    @GetMapping("/members")
    public ResponseEntity<ResponseDto> getMember(HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            // AccessToken 유효성 검사
            if (!jwtTokenizer.validateToken(token)) {
                // AccessToken이 만료된 경우 RefreshToken으로 갱신 시도
                if (refreshToken != null && jwtTokenizer.validateRefreshToken(refreshToken)) {
                    // Refresh Token 검증 및 memberId 식별
                    long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

                    // memberId를 사용하여 회원 정보 확인
                    Member verifiedMember = memberService.findMember(memberId);

                    if (verifiedMember == null) {
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
                    }

                    // 새로운 AccessToken 발급
                    String newAccessToken = jwtTokenizer.generateAccessToken(verifiedMember.getEmail(), verifiedMember.getMemberId());

                    // 새로운 AccessToken으로 인증 및 인가 처리
                    Member foundMember = memberService.findMember(memberId);

                    ResponseDto responseDto = new ResponseDto(foundMember);
                    responseDto.setEmail(verifiedMember.getEmail());

                    // 새로운 AccessToken을 헤더에 담아서 응답
                    HttpHeaders headers = new HttpHeaders();
                    headers.add("Authorization", "Bearer " + newAccessToken);
                    return new ResponseEntity<>(responseDto, headers, HttpStatus.OK);
                } else {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
                }
            }

            // AccessToken이 유효한 경우
            // memberId를 사용하여 회원 정보 확인
            long memberId = jwtTokenizer.getMemberIdFromToken(token);
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            // memberId를 사용하여 인증 및 인가 처리
            Member foundMember = memberService.findMember(memberId);

            ResponseDto responseDto = new ResponseDto(foundMember);
            responseDto.setEmail(verifiedMember.getEmail());

            // 기존의 AccessToken을 헤더에 담아서 응답
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + token);
            return new ResponseEntity<>(responseDto, headers, HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    // 닉네임 변경
    @PatchMapping("/members/nickname")
    public ResponseEntity<String> patchMember(HttpServletRequest request, @RequestBody NicknameDto nicknameDto) {
        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            // AccessToken 유효성 검사
            if (!jwtTokenizer.validateToken(token)) {
                // AccessToken이 만료된 경우 RefreshToken으로 갱신 시도
                if (refreshToken != null && jwtTokenizer.validateRefreshToken(refreshToken)) {
                    // Refresh Token 검증 및 memberId 식별
                    long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

                    // memberId를 사용하여 회원 정보 확인
                    Member verifiedMember = memberService.findMember(memberId);

                    if (verifiedMember == null) {
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
                    }

                    // 새로운 AccessToken 발급
                    String newAccessToken = jwtTokenizer.generateAccessToken(verifiedMember.getEmail(), verifiedMember.getMemberId());

                    // 새로운 AccessToken으로 닉네임 변경 처리
                    if (!nicknameDto.getNickname().matches("^[ㄱ-ㅎ가-힣a-zA-Z0-9-_]{2,10}$")) {
                        throw new BusinessLogicException(ExceptionCode.INVALID_NICKNAME_FORMAT);
                    }

                    Member member = new Member(nicknameDto);
                    Member updatedMember = memberService.updateMember(memberId, member);

                    // 새로운 AccessToken을 헤더에 담아서 응답
                    HttpHeaders headers = new HttpHeaders();
                    headers.add("Authorization", "Bearer " + newAccessToken);
                    return new ResponseEntity<>("Succeed Update Nickname", headers, HttpStatus.OK);
                } else {
                    // RefreshToken이 만료되었을 경우, 새로운 로그인 요청
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다. 다시 로그인해주세요");
                }
            }

            // AccessToken이 유효한 경우
            // memberId를 사용하여 회원 정보 확인
            long memberId = jwtTokenizer.getMemberIdFromToken(token);
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            // 닉네임 유효성 검증
            if (!nicknameDto.getNickname().matches("^[ㄱ-ㅎ가-힣a-zA-Z0-9-_]{2,10}$")) {
                throw new BusinessLogicException(ExceptionCode.INVALID_NICKNAME_FORMAT);
            }

            Member member = new Member(nicknameDto);
            Member updatedMember = memberService.updateMember(memberId, member);
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + token);
            return new ResponseEntity<>("Succeed Update Nickname", headers, HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    // 비밀번호 변경
    @PatchMapping("/members/password")
    public ResponseEntity<String> changePassword(HttpServletRequest request,
                                                 @Valid @RequestBody PasswordDto passwordDto,
                                                 BindingResult bindingResult) {

        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            // AccessToken 유효성 검사
            if (!jwtTokenizer.validateToken(token)) {
                // AccessToken이 만료된 경우 RefreshToken으로 갱신 시도
                if (refreshToken != null && jwtTokenizer.validateRefreshToken(refreshToken)) {
                    // Refresh Token 검증 및 memberId 식별
                    long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

                    // memberId를 사용하여 회원 정보 확인
                    Member verifiedMember = memberService.findMember(memberId);

                    if (verifiedMember == null) {
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
                    }

                    // 새로운 AccessToken 발급
                    String newAccessToken = jwtTokenizer.generateAccessToken(verifiedMember.getEmail(), verifiedMember.getMemberId());

                    HttpHeaders headers = new HttpHeaders();
                    headers.add("Authorization", "Bearer " + newAccessToken);

                    // 비밀번호 변경 처리
                    return changePasswordLogic(headers, memberId, passwordDto, bindingResult);
                } else {
                    // RefreshToken이 만료되었을 경우, 새로운 로그인 요청
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다. 다시 로그인해주세요");
                }
            }

            // AccessToken이 유효한 경우
            long memberId = jwtTokenizer.getMemberIdFromToken(token);
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + token);

            // 비밀번호 변경 처리
            return changePasswordLogic(headers, memberId, passwordDto, bindingResult);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    // 비밀번호 변경 처리 메서드
    private ResponseEntity<String> changePasswordLogic(HttpHeaders headers, long memberId, PasswordDto passwordDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // 유효성 검사 오류 처리
            String errorMessage = bindingResult.getFieldError().getDefaultMessage();
            return new ResponseEntity<>(errorMessage, headers, HttpStatus.BAD_REQUEST);
        }

        try {
            boolean passwordChanged = memberService.updatePassword(memberId,
                    passwordDto.getPassword(),
                    passwordDto.getNewPassword());
            if (passwordChanged) {
                return new ResponseEntity<>("Password changed successfully!", headers, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Failed to change password.", headers, HttpStatus.BAD_REQUEST);
            }
        } catch (BusinessLogicException e) {
            if (e.getExceptionCode() == ExceptionCode.SAME_CURRENT_PASSWORD) {
                return new ResponseEntity<>("현재 비밀번호와 일치합니다.", headers, HttpStatus.CONFLICT);
            } else {
                return new ResponseEntity<>(e.getExceptionCode().getMessage(), headers, HttpStatus.BAD_REQUEST);
            }
        }
    }

    // 회원탈퇴
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/members")
    public void deleteMember(HttpServletRequest request,
                             @RequestParam("password") String password) {

        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            // AccessToken 유효성 검사
            if (!jwtTokenizer.validateToken(token)) {
                // AccessToken이 만료된 경우 RefreshToken으로 갱신 시도
                if (refreshToken != null && jwtTokenizer.validateRefreshToken(refreshToken)) {
                    // Refresh Token 검증 및 memberId 식별
                    long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

                    // memberId를 사용하여 회원 정보 확인
                    Member verifiedMember = memberService.findMember(memberId);

                    if (verifiedMember == null) {
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
                    }

                    // 새로운 AccessToken 발급
                    String newAccessToken = jwtTokenizer.generateAccessToken(verifiedMember.getEmail(), verifiedMember.getMemberId());

                    // 회원 정보 확인 후 작업 수행
                    memberService.terminateMember(memberId, password);
                } else {
                    // RefreshToken이 만료되었을 경우, 새로운 로그인 요청
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다. 다시 로그인해주세요");
                }
            }

            // AccessToken이 유효한 경우
            // memberId를 사용하여 회원 정보 확인
            long memberId = jwtTokenizer.getMemberIdFromToken(token);
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            // 회원 정보 확인 후 작업 수행
            memberService.terminateMember(memberId, password);

        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    // 이미지 업로드
    @PostMapping("/members/profile-image")
    public ResponseEntity<String> uploadProfileImage(HttpServletRequest request, @RequestParam("file") MultipartFile file) {
        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            if (!jwtTokenizer.validateToken(token)) {
                // AccessToken이 만료된 경우 RefreshToken으로 갱신 시도
                if (refreshToken != null && jwtTokenizer.validateRefreshToken(refreshToken)) {
                    // Refresh Token 검증 및 memberId 식별
                    long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

                    // memberId를 사용하여 회원 정보 확인
                    Member verifiedMember = memberService.findMember(memberId);

                    if (verifiedMember == null) {
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
                    }

                    // 새로운 AccessToken 발급
                    String newAccessToken = jwtTokenizer.generateAccessToken(verifiedMember.getEmail(), verifiedMember.getMemberId());

                    // 새로운 AccessToken으로 인증 및 인가 처리
                    try {
                        memberService.createProfileImage(memberId, file);

                        // 새로운 AccessToken을 헤더에 담아서 응답
                        HttpHeaders headers = new HttpHeaders();
                        headers.add("Authorization", "Bearer " + newAccessToken);
                        return new ResponseEntity<>("Profile image uploaded successfully!", headers, HttpStatus.OK);
                    } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile image.");
                    }
                } else {
                    // RefreshToken이 만료되었을 경우, 새로운 로그인 요청
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다. 다시 로그인해주세요");
                }
            } else {
                // AccessToken이 유효한 경우
                // memberId를 사용하여 회원 정보 확인
                long memberId = jwtTokenizer.getMemberIdFromToken(token);
                Member verifiedMember = memberService.findMember(memberId);

                if (verifiedMember == null) {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
                }

                try {
                    memberService.createProfileImage(memberId, file);
                    // 기존의 AccessToken을 헤더에 담아서 응답
                    HttpHeaders headers = new HttpHeaders();
                    headers.add("Authorization", "Bearer " + token);
                    return new ResponseEntity<>("Profile image uploaded successfully!", headers, HttpStatus.OK);
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile image.");
                }
            }
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    // 이미지 수정
    @PatchMapping("/members/profile-image")
    public ResponseEntity<String> updateProfileImage(HttpServletRequest request, @RequestParam("file") MultipartFile file) {

        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            // AccessToken 유효성 검사
            if (!jwtTokenizer.validateToken(token)) {
                // AccessToken이 만료된 경우 RefreshToken으로 갱신 시도
                if (refreshToken != null && jwtTokenizer.validateRefreshToken(refreshToken)) {
                    // Refresh Token 검증 및 memberId 식별
                    long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

                    // memberId를 사용하여 회원 정보 확인
                    Member verifiedMember = memberService.findMember(memberId);

                    if (verifiedMember == null) {
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
                    }

                    // 새로운 AccessToken 발급
                    String newAccessToken = jwtTokenizer.generateAccessToken(verifiedMember.getEmail(), verifiedMember.getMemberId());

                    try {
                        // 새로운 AccessToken으로 프로필 이미지 수정 작업 수행
                        memberService.updateProfileImage(memberId, file);

                        // 새로운 AccessToken을 헤더에 담아서 응답
                        HttpHeaders headers = new HttpHeaders();
                        headers.add("Authorization", "Bearer " + newAccessToken);
                        return new ResponseEntity<>("Profile image updated successfully!", headers, HttpStatus.OK);

                    } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update profile image.");
                    }
                } else {
                    // RefreshToken이 만료되었을 경우, 새로운 로그인 요청
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다. 다시 로그인해주세요");
                }
            }

            // AccessToken이 유효한 경우
            // memberId를 사용하여 회원 정보 확인
            long memberId = jwtTokenizer.getMemberIdFromToken(token);
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            try {
                // 기존의 AccessToken으로 프로필 이미지 수정 작업 수행
                memberService.updateProfileImage(memberId, file);

                // 기존의 AccessToken을 헤더에 담아서 응답
                HttpHeaders headers = new HttpHeaders();
                headers.add("Authorization", "Bearer " + token);
                return new ResponseEntity<>("Profile image updated successfully!", headers, HttpStatus.OK);

            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update profile image.");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    // 이미지 조회
    @GetMapping("/members/profile-image")
    public ResponseEntity<byte[]> getProfileImage(HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            // AccessToken 유효성 검사
            if (!jwtTokenizer.validateToken(token)) {
                // AccessToken이 만료된 경우 RefreshToken으로 갱신 시도
                if (refreshToken != null && jwtTokenizer.validateRefreshToken(refreshToken)) {
                    // Refresh Token 검증 및 memberId 식별
                    long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

                    // memberId를 사용하여 회원 정보 확인
                    Member verifiedMember = memberService.findMember(memberId);

                    if (verifiedMember == null) {
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
                    }

                    // 새로운 AccessToken 발급
                    String newAccessToken = jwtTokenizer.generateAccessToken(verifiedMember.getEmail(), verifiedMember.getMemberId());

                    // 새로운 AccessToken으로 인증 및 인가 처리
                    HttpHeaders headers = new HttpHeaders();
                    headers.add("Authorization", "Bearer " + newAccessToken);

                    try {
                        byte[] imageBytes = memberService.getProfileImage(memberId);
                        if (imageBytes != null) {
                            String fileName = "profile-image.jpg"; // 기본적으로 JPEG로 가정
                            // 파일 확장자에 따라 적절한 MediaType 설정
                            String mimeType = MediaTypeFactory.getMediaType(fileName)
                                    .orElse(MediaType.IMAGE_JPEG).toString();
                            headers.setContentType(MediaType.parseMediaType(mimeType));
                            return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
                        } else {
                            return ResponseEntity.notFound().build();
                        }
                    } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Failed to retrieve profile image.".getBytes());
                    }
                } else {
                    // RefreshToken이 만료되었을 경우, 새로운 로그인 요청
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다. 다시 로그인해주세요");
                }
            }

            // AccessToken이 유효한 경우
            // memberId를 사용하여 회원 정보 확인
            long memberId = jwtTokenizer.getMemberIdFromToken(token);
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            try {
                byte[] imageBytes = memberService.getProfileImage(memberId);
                if (imageBytes != null) {
                    String fileName = "profile-image.jpg"; // 기본적으로 JPEG로 가정
                    // 파일 확장자에 따라 적절한 MediaType 설정
                    String mimeType = MediaTypeFactory.getMediaType(fileName)
                            .orElse(MediaType.IMAGE_JPEG).toString();

                    HttpHeaders headers = new HttpHeaders();
                    headers.setContentType(MediaType.parseMediaType(mimeType));
                    headers.add("Authorization", "Bearer " + token); // 기존의 AccessToken을 헤더에 담아서 응답
                    return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
                } else {
                    return ResponseEntity.notFound().build();
                }
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to retrieve profile image.".getBytes());
            }
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    // 이미지 삭제
    @DeleteMapping("/members/profile-image")
    public ResponseEntity<String> deleteProfileImage(HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            // AccessToken 유효성 검사
            if (!jwtTokenizer.validateToken(token)) {
                // AccessToken이 만료된 경우 RefreshToken으로 갱신 시도
                if (refreshToken != null && jwtTokenizer.validateRefreshToken(refreshToken)) {
                    // Refresh Token 검증 및 memberId 식별
                    long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

                    // memberId를 사용하여 회원 정보 확인
                    Member verifiedMember = memberService.findMember(memberId);

                    if (verifiedMember == null) {
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
                    }

                    // 새로운 AccessToken 발급
                    String newAccessToken = jwtTokenizer.generateAccessToken(verifiedMember.getEmail(), verifiedMember.getMemberId());

                    // 새로운 AccessToken으로 인증 및 인가 처리
                    HttpHeaders headers = new HttpHeaders();
                    headers.add("Authorization", "Bearer " + newAccessToken);

                    try {
                        memberService.deleteProfileImage(memberId);
                        return ResponseEntity.ok("Profile image deleted successfully!");
                    } catch (IllegalArgumentException e) {
                        return ResponseEntity.badRequest().body(e.getMessage());
                    } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Failed to delete profile image.");
                    }
                } else {
                    // RefreshToken이 만료되었을 경우, 새로운 로그인 요청
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다. 다시 로그인해주세요");
                }
            }

            // AccessToken이 유효한 경우
            // memberId를 사용하여 회원 정보 확인
            long memberId = jwtTokenizer.getMemberIdFromToken(token);
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            try {
                memberService.deleteProfileImage(memberId);
                return ResponseEntity.ok("Profile image deleted successfully!");
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to delete profile image.");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }
}

