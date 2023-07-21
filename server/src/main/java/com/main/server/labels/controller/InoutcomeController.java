package com.main.server.labels.controller;

import com.main.server.labels.entity.Inoutcome;
import com.main.server.labels.inoutcomedto.InoutcomePatchDto;
import com.main.server.labels.inoutcomedto.InoutcomePostDto;
import com.main.server.labels.inoutcomedto.InoutcomeResponseDto;
import com.main.server.labels.service.InoutcomeService;
import com.main.server.member.Member;
import com.main.server.member.MemberService;
import com.main.server.security.JwtTokenizer;
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

@RestController
@CrossOrigin
@RequestMapping("/inoutcomes")
public class InoutcomeController {

    private final InoutcomeService inoutcomeService;
    private JwtTokenizer jwtTokenizer;
    private MemberService memberService;

    public InoutcomeController(InoutcomeService inoutcomeService, JwtTokenizer jwtTokenizer, MemberService memberService) {
        this.inoutcomeService = inoutcomeService;
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity<InoutcomeResponseDto> createInoutcome(
            @Valid @RequestBody InoutcomePostDto inoutcomePostDto,
            HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            // 토큰 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 회원 정보 확인 후 작업 수행
            Inoutcome createdInoutcome = inoutcomeService.createInoutcome(inoutcomePostDto, token);
            InoutcomeResponseDto responseDto = new InoutcomeResponseDto(createdInoutcome);
            return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
        }

        else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            Inoutcome createdInoutcome = inoutcomeService.createInoutcome(inoutcomePostDto, token);
            InoutcomeResponseDto responseDto = new InoutcomeResponseDto(createdInoutcome);
            return new ResponseEntity<>(responseDto, HttpStatus.CREATED);

        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @PatchMapping("/{in_outcome-id}")
    public ResponseEntity<InoutcomeResponseDto> updateInoutcome(
            @PathVariable("in_outcome-id") @Positive Long inoutcomeId,
            @Validated @RequestBody InoutcomePatchDto inoutcomePatchDto,
            HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            // 토큰 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 회원 정보 확인 후 작업 수행
            Inoutcome updatedInoutcome = inoutcomeService.updateInoutcome(inoutcomeId, inoutcomePatchDto);
            InoutcomeResponseDto responseDto = new InoutcomeResponseDto(updatedInoutcome);
            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        }

        else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            Inoutcome updatedInoutcome = inoutcomeService.updateInoutcome(inoutcomeId, inoutcomePatchDto);
            InoutcomeResponseDto responseDto = new InoutcomeResponseDto(updatedInoutcome);
            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @GetMapping("/{in_outcome-id}")
    public ResponseEntity<InoutcomeResponseDto> getInoutcome(
            @PathVariable("in-outcome-id") @Positive Long inoutcomeId,
            HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            // 토큰 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 회원 정보 확인 후 작업 수행
            Inoutcome inoutcome = inoutcomeService.getInoutcome(inoutcomeId);
            InoutcomeResponseDto responseDto = new InoutcomeResponseDto(inoutcome);
            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        }

        else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            Inoutcome inoutcome = inoutcomeService.getInoutcome(inoutcomeId);
            InoutcomeResponseDto responseDto = new InoutcomeResponseDto(inoutcome);
            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @GetMapping
    public ResponseEntity<List<InoutcomeResponseDto>> getInoutcomes(HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            // 토큰 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 회원 정보 확인 후 작업 수행
            List<Inoutcome> inoutcomes = inoutcomeService.getInoutcomes();
            List<InoutcomeResponseDto> responseDtoList = inoutcomes.stream()
                    .map(InoutcomeResponseDto::new)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
        }

        else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            List<Inoutcome> inoutcomes = inoutcomeService.getInoutcomes();
            List<InoutcomeResponseDto> responseDtoList = inoutcomes.stream()
                    .map(InoutcomeResponseDto::new)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @DeleteMapping("/{in_outcome-id}")
    public ResponseEntity<Void> deleteInoutcome(
            @PathVariable("in-outcome-id") @Positive Long inoutcomeId,
            HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            // 토큰 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 회원 정보 확인 후 작업 수행
            inoutcomeService.deleteInoutcome(inoutcomeId);
            return new ResponseEntity<>(HttpStatus.OK);
        }

        else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            inoutcomeService.deleteInoutcome(inoutcomeId);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }
}
