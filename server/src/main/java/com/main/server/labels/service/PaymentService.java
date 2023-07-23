package com.main.server.labels.service;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.labels.entity.Payment;
import com.main.server.labels.paymentdto.PaymentPatchDto;
import com.main.server.labels.paymentdto.PaymentPostDto;
import com.main.server.labels.repository.PaymentRepository;
import com.main.server.member.Member;
import com.main.server.member.MemberService;
import com.main.server.security.JwtTokenizer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class PaymentService {
    private final MemberService memberService;
    private final PaymentRepository paymentRepository;
    private JwtTokenizer jwtTokenizer;

    public PaymentService(MemberService memberService, PaymentRepository paymentRepository, JwtTokenizer jwtTokenizer) {
        this.memberService= memberService;
        this.paymentRepository = paymentRepository;
        this.jwtTokenizer = jwtTokenizer;
    }
    public Payment createPayment(PaymentPostDto postDto, String token) {

        // 토큰 검증 및 memberId 식별
        long memberId = jwtTokenizer.getMemberIdFromToken(token);

        // memberId를 사용하여 회원 정보 확인
        Member member = memberService.findMember(memberId);
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        Payment postedPayment = paymentRepository.save(postDto.toEntity(member));
        return postedPayment;
    }
    public Payment updatePayment(Long paymentId, PaymentPatchDto patchDto, String token) {
        Payment updatedPayment = existingPayment(paymentId);
        updatedPayment.changeName(patchDto.getPaymentName());

        return updatedPayment;
    }
    public Payment getPayment(Long paymentId, String token){
        return existingPayment(paymentId);
    }

    public List<Payment> getPayments(String token) {
        return paymentRepository.findAll();
    }

    public void deletePayment(Long paymentId, String token) {
        Payment deletedPayment = existingPayment(paymentId);
        paymentRepository.delete(deletedPayment);
    }

    @Transactional
    public Payment findByPaymentId(final Long paymentId) {
        return paymentRepository.findById(paymentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PAYMENT_NOT_FOUND));
    }

    @Transactional(readOnly = true )
    public Payment existingPayment(Long paymentId) {
        Payment existingPayment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PAYMENT_NOT_FOUND));
        return existingPayment;
    }

}

