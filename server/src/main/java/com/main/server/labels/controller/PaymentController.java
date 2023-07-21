package com.main.server.labels.controller;

import com.main.server.labels.entity.Payment;
import com.main.server.labels.paymentdto.PaymentPatchDto;
import com.main.server.labels.paymentdto.PaymentPostDto;
import com.main.server.labels.paymentdto.PaymentResponseDto;
import com.main.server.labels.service.PaymentService;
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
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;
    private JwtTokenizer jwtTokenizer;
    private MemberService memberService;

    public PaymentController(PaymentService paymentService, JwtTokenizer jwtTokenizer, MemberService memberService) {
        this.paymentService = paymentService;
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity<PaymentResponseDto> createPayment(
            @Valid @RequestBody PaymentPostDto paymentPostDto,
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
            Payment createdPayment = paymentService.createPayment(paymentPostDto, token);
            PaymentResponseDto responseDto = new PaymentResponseDto(createdPayment);
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

            Payment createdPayment = paymentService.createPayment(paymentPostDto, token);
            PaymentResponseDto responseDto = new PaymentResponseDto(createdPayment);
            return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @PatchMapping("/{payment-id}")
    public ResponseEntity<PaymentResponseDto> updatePayment(
            @PathVariable("payment-id") @Positive Long paymentId,
            @Validated @RequestBody PaymentPatchDto paymentPatchDto,
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
            Payment updatedPayment = paymentService.updatePayment(paymentId, paymentPatchDto);
            PaymentResponseDto responseDto = new PaymentResponseDto(updatedPayment);
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

            Payment updatedPayment = paymentService.updatePayment(paymentId, paymentPatchDto);
            PaymentResponseDto responseDto = new PaymentResponseDto(updatedPayment);
            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @GetMapping("/{payment-id}")
    public ResponseEntity<PaymentResponseDto> getPayment(
            @PathVariable("payment-id") @Positive Long paymentId,
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
            Payment payment = paymentService.getPayment(paymentId);
            PaymentResponseDto responseDto = new PaymentResponseDto(payment);
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

            Payment payment = paymentService.getPayment(paymentId);
            PaymentResponseDto responseDto = new PaymentResponseDto(payment);
            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @GetMapping
    public ResponseEntity<List<PaymentResponseDto>> getPayments(HttpServletRequest request) {

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
            List<Payment> payments = paymentService.getPayments();
            List<PaymentResponseDto> responseDtoList = payments.stream()
                    .map(PaymentResponseDto::new)
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

            List<Payment> payments = paymentService.getPayments();
            List<PaymentResponseDto> responseDtoList = payments.stream()
                    .map(PaymentResponseDto::new)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @DeleteMapping("/{payment-id}")
    public ResponseEntity<Void> deletePayment(
            @PathVariable("payment-id") @Positive Long paymentId,
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
            paymentService.deletePayment(paymentId);
            return new ResponseEntity<>(HttpStatus.OK);
        } else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            paymentService.deletePayment(paymentId);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }
}

