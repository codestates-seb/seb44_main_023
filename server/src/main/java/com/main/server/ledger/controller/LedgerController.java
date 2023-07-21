package com.main.server.ledger.controller;

import com.main.server.ledger.dto.LedgerPatchDto;
import com.main.server.ledger.dto.LedgerPostDto;
import com.main.server.ledger.dto.LedgerResponseDto;
import com.main.server.ledger.entity.Ledger;
import com.main.server.ledger.service.LedgerService;
import com.main.server.member.Member;
import com.main.server.member.MemberService;
import com.main.server.security.JwtTokenizer;
import com.main.server.todo.domain.Todo;
import com.main.server.todo.dto.TodoDto;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/ledgergroups/{ledger-group-id}/ledgers")
public class LedgerController {

    private final LedgerService ledgerService;
    private JwtTokenizer jwtTokenizer;
    private MemberService memberService;

    public LedgerController(LedgerService ledgerService, JwtTokenizer jwtTokenizer, MemberService memberService) {
        this.ledgerService = ledgerService;
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity<LedgerResponseDto> createLedger(
            @PathVariable("ledger-group-id") @Positive Long ledgerGroupId,
            @Validated @RequestBody LedgerPostDto postDto,
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
            Ledger ledger = ledgerService.createLedger(ledgerGroupId, postDto, token);

            return new ResponseEntity<>(new LedgerResponseDto(ledger), HttpStatus.CREATED);
        } else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            Ledger ledger = ledgerService.createLedger(ledgerGroupId, postDto, token);

            return new ResponseEntity<>(new LedgerResponseDto(ledger), HttpStatus.CREATED);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @PatchMapping("/{ledger-id}")
    public ResponseEntity patchLedger(@PathVariable("ledger-group-id") @Positive Long ledgerGroupId,
                                      @PathVariable("ledger-id") @Positive Long ledgerId,
                                      @Valid @RequestBody LedgerPatchDto patchDto,
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
            Ledger ledger = ledgerService.updateLedger(ledgerGroupId, ledgerId, patchDto);

            return new ResponseEntity(new LedgerResponseDto(ledger), HttpStatus.OK);
        } else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            Ledger ledger = ledgerService.updateLedger(ledgerGroupId, ledgerId, patchDto);

            return new ResponseEntity(new LedgerResponseDto(ledger), HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @GetMapping("/{ledger-id}")
    public ResponseEntity getLedger(@PathVariable("ledger-group-id") @Positive Long ledgerGroupId,
                                    @PathVariable("ledger-id") @Positive Long ledgerId,
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
            Ledger ledger = ledgerService.getLedger(ledgerGroupId, ledgerId);
            return new ResponseEntity(new LedgerResponseDto(ledger), HttpStatus.OK);
        } else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            Ledger ledger = ledgerService.getLedger(ledgerGroupId, ledgerId);
            return new ResponseEntity(new LedgerResponseDto(ledger), HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @GetMapping()
    public ResponseEntity<List<LedgerResponseDto>> getLedgers(@PathVariable("ledger-group-id") @Positive Long ledgerGroupId,
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
            List<Ledger> ledgers = this.ledgerService.getLedgers(ledgerGroupId);
            List<LedgerResponseDto> responses = ledgers.stream()
                    .map((ledger -> new LedgerResponseDto(ledger)))
                    .collect(Collectors.toList());

            return new ResponseEntity<>(responses, HttpStatus.OK);

        } else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            List<Ledger> ledgers = this.ledgerService.getLedgers(ledgerGroupId);
            List<LedgerResponseDto> responses = ledgers.stream()
                    .map((ledger -> new LedgerResponseDto(ledger)))
                    .collect(Collectors.toList());

            return new ResponseEntity<>(responses, HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @GetMapping("/dates")
    public ResponseEntity<List<LedgerResponseDto>> getLedgersBetweenDates(
            @PathVariable("ledger-group-id") @Positive Long ledgerGroupId,
            @RequestParam(name = "startDate") String startDate,
            @RequestParam(name = "endDate") String endDate,
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
            try {
                LocalDate start = LocalDate.parse(startDate);
                LocalDate end = LocalDate.parse(endDate);

                List<Ledger> ledgers = ledgerService.getLedgersByDate(ledgerGroupId, start, end);
                List<LedgerResponseDto> responseDtos = ledgers.stream()
                        .map(LedgerResponseDto::new)
                        .collect(Collectors.toList());

                return new ResponseEntity<>(responseDtos, HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

        } else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            try {
                LocalDate start = LocalDate.parse(startDate);
                LocalDate end = LocalDate.parse(endDate);

                List<Ledger> ledgers = ledgerService.getLedgersByDate(ledgerGroupId, start, end);
                List<LedgerResponseDto> responseDtos = ledgers.stream()
                        .map(LedgerResponseDto::new)
                        .collect(Collectors.toList());

                return new ResponseEntity<>(responseDtos, HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @DeleteMapping("/{ledger-id}")
    public ResponseEntity deleteLedger(@PathVariable("ledger-group-id") @Positive Long ledgerGroupId,
                                       @PathVariable("ledger-id") @Positive Long ledgerId,
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
            ledgerService.deleteLedger(ledgerGroupId, ledgerId);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 회원 정보 확인 후 작업 수행
            ledgerService.deleteLedger(ledgerGroupId, ledgerId);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }
}



