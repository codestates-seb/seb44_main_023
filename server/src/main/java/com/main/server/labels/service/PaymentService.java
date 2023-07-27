package com.main.server.labels.service;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.labels.entity.Payment;
import com.main.server.labels.paymentdto.PaymentPatchDto;
import com.main.server.labels.paymentdto.PaymentPostDto;
import com.main.server.labels.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class PaymentService {
//    private final MemberService memberService;
    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
//        this.memberService= memberService;
        this.paymentRepository = paymentRepository;
    }
    public Payment createPayment(PaymentPostDto postDto) {
//        Member member = memberService.findMember(postDto.getMemberId());
        Payment postedPayment = paymentRepository.save(postDto.toEntity());
        return postedPayment;
    }
    public Payment updatePayment(Long paymentId, PaymentPatchDto patchDto) {
        Payment updatedPayment = existingPayment(paymentId);
        updatedPayment.changeName(patchDto.getPaymentName());

        return updatedPayment;
    }
    public Payment getPayment(Long paymentId){
        return existingPayment(paymentId);
    }

    public List<Payment> getPayments() {
        return paymentRepository.findAll();
    }

    public void deletePayment(Long paymentId) {
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

