package com.main.server.ledgerGroup.controller;

import com.main.server.ledgerGroup.dto.LedgerGroupPatchDto;
import com.main.server.ledgerGroup.dto.LedgerGroupPostDto;
import com.main.server.ledgerGroup.dto.LedgerGroupResponseDto;
import com.main.server.ledgerGroup.entity.LedgerGroup;
import com.main.server.ledgerGroup.invitationDto.InvitationLedgerGroupPostDto;
import com.main.server.ledgerGroup.invitationDto.InvitationLedgerGroupResponseDto;
import com.main.server.ledgerGroup.invitationDto.InvitationMemberResponseDto;
import com.main.server.ledgerGroup.service.LedgerGroupService;
import org.springframework.beans.factory.annotation.Value;
import com.main.server.member.Member;
import com.main.server.member.MemberService;
import com.main.server.security.JwtTokenizer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "https://codestates.shop")
@RestController
@Validated
@RequestMapping("/ledgergroups")
public class LedgerGroupController {

    @Value("${file.upload.path}")
    private String fileUploadPath;

    private final LedgerGroupService ledgerGroupService;

    private JwtTokenizer jwtTokenizer;
    private MemberService memberService;
    public LedgerGroupController(LedgerGroupService ledgerGroupService, JwtTokenizer jwtTokenizer, MemberService memberService) {
        this.ledgerGroupService = ledgerGroupService;
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
    }
    
    @PostMapping
    public ResponseEntity createLedgerGroup(@Valid @RequestBody LedgerGroup ledgerGroupPostDto) {
        LedgerGroup ledgerGroup = ledgerGroupService.createLedgerGroup(ledgerGroupPostDto);

        return new ResponseEntity<>(new LedgerGroupResponseDto(ledgerGroup), HttpStatus.CREATED);
    }
    
    @PatchMapping("/{ledger-group-id}")
    public ResponseEntity updateLedgerGroup(@PathVariable("ledger-group-id") @Positive Long ledgerGroupId,
                                            @Valid @RequestBody LedgerGroupPatchDto ledgerGroupPatchDto,
                                            HttpServletRequest request) {
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
                    // 작업 수행
                    LedgerGroup ledgerGroup = ledgerGroupService.updateLedgerGroup(ledgerGroupId, ledgerGroupPatchDto);
                    return new ResponseEntity<>(new LedgerGroupResponseDto(ledgerGroup), headers, HttpStatus.OK);
                } else {
                    // RefreshToken이 만료되었을 경우, 새로운 로그인 요청
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다. 다시 로그인해주세요");
                }
            }
            // AccessToken이 유효한 경우
            long memberId = jwtTokenizer.getMemberIdFromToken(token);
            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);
            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 작업 수행
            LedgerGroup ledgerGroup = ledgerGroupService.updateLedgerGroup(ledgerGroupId, ledgerGroupPatchDto);
            return new ResponseEntity<>(new LedgerGroupResponseDto(ledgerGroup), HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }
    @GetMapping("/{ledger-group-id}")
    public ResponseEntity getLedgerGroup(@PathVariable("ledger-group-id") @Positive Long ledgerGroupId,
                                         HttpServletRequest request) {
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
                    // 작업 수행
                    LedgerGroup ledgerGroup = ledgerGroupService.getLedgerGroup(ledgerGroupId);
                    return new ResponseEntity<>(new LedgerGroupResponseDto(ledgerGroup), headers, HttpStatus.OK);
                } else {
                    // RefreshToken이 만료되었을 경우, 새로운 로그인 요청
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다. 다시 로그인해주세요");
                }
            }
            // AccessToken이 유효한 경우
            long memberId = jwtTokenizer.getMemberIdFromToken(token);
            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);
            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 작업 수행
            LedgerGroup ledgerGroup = ledgerGroupService.getLedgerGroup(ledgerGroupId);
            return new ResponseEntity<>(new LedgerGroupResponseDto(ledgerGroup), HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }
    
    @GetMapping
    public ResponseEntity<List<LedgerGroupResponseDto>> getLedgerGroups() {
        List<LedgerGroup> ledgerGroups = ledgerGroupService.getLedgerGroups();
        List<LedgerGroupResponseDto> responses = ledgerGroups.stream()
                .map((ledgerGroup -> new LedgerGroupResponseDto(ledgerGroup)))
                .collect(Collectors.toList());

        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
    
    @DeleteMapping("/{ledger-group-id}")
    public ResponseEntity deleteLedgerGroup(@PathVariable("ledger-group-id") @Positive Long ledgerGroupId,
                                            HttpServletRequest request) {
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
                    // 작업 수행
                    ledgerGroupService.deleteLedgerGroup(ledgerGroupId);
                    return new ResponseEntity<>(headers, HttpStatus.NO_CONTENT);
                } else {
                    // RefreshToken이 만료되었을 경우, 새로운 로그인 요청
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다. 다시 로그인해주세요");
                }
            }
            // AccessToken이 유효한 경우
            long memberId = jwtTokenizer.getMemberIdFromToken(token);
            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);
            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 작업 수행
            ledgerGroupService.deleteLedgerGroup(ledgerGroupId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

   @PostMapping("/ledgergroups/{ledger-group-id}/invitation")
    public ResponseEntity invite(@PathVariable("ledger-group-id") @Positive Long ledgerGroupId,
                                 @Valid @RequestBody InvitationLedgerGroupPostDto invitationLedgerGroupPostDto,
                                 HttpServletRequest request) {

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

                    // 초대 처리
                    LedgerGroup ledgerGroup = ledgerGroupService.invite(ledgerGroupId, invitationLedgerGroupPostDto, newAccessToken);

                    return new ResponseEntity<>(new InvitationLedgerGroupResponseDto(ledgerGroup), headers, HttpStatus.CREATED);
                } else {
                    // RefreshToken이 만료되었을 경우, 새로운 로그인 요청
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다. 다시 로그인해주세요");
                }
            }

            // AccessToken이 유효한 경우
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            // 초대 처리
            LedgerGroup ledgerGroup = ledgerGroupService.invite(ledgerGroupId, invitationLedgerGroupPostDto, token);

            return new ResponseEntity<>(new InvitationLedgerGroupResponseDto(ledgerGroup), HttpStatus.CREATED);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }


    @GetMapping("/{ledger-group-id}/members")
    public ResponseEntity inviteMember(@PathVariable("ledger-group-id")
                                       @Positive Long ledgerGroupId, HttpServletRequest request) {

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

                    // 작업 수행

                 LedgerGroup ledgerGroup = ledgerGroupService.getInvitedMember(ledgerGroupId);
                 return new ResponseEntity(new InvitationMemberResponseDto(ledgerGroup, fileUploadPath), HttpStatus.OK);

                } else {
                    // RefreshToken이 만료되었을 경우, 새로운 로그인 요청
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다. 다시 로그인해주세요");
                }
            }

            // AccessToken이 유효한 경우
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            LedgerGroup ledgerGroup = ledgerGroupService.getInvitedMember(ledgerGroupId);
            return new ResponseEntity(new InvitationMemberResponseDto(ledgerGroup, fileUploadPath), HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }

        }

}
