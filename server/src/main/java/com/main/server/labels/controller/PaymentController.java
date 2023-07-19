package com.main.server.labels.controller;

import com.main.server.labels.entity.Payment;
import com.main.server.labels.paymentdto.PaymentPatchDto;
import com.main.server.labels.paymentdto.PaymentPostDto;
import com.main.server.labels.paymentdto.PaymentResponseDto;
import com.main.server.labels.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public ResponseEntity<PaymentResponseDto> createPayment(
            @Valid @RequestBody PaymentPostDto paymentPostDto) {
        Payment createdPayment = paymentService.createPayment(paymentPostDto);
        PaymentResponseDto responseDto = new PaymentResponseDto(createdPayment);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @PatchMapping("/{payment-id}")
    public ResponseEntity<PaymentResponseDto> updatePayment(
            @PathVariable("payment-id") @Positive Long paymentId,
            @Validated @RequestBody PaymentPatchDto paymentPatchDto) {
        Payment updatedPayment = paymentService.updatePayment(paymentId, paymentPatchDto);
        PaymentResponseDto responseDto = new PaymentResponseDto(updatedPayment);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/{payment-id}")
    public ResponseEntity<PaymentResponseDto> getPayment(
            @PathVariable("payment-id") @Positive Long paymentId) {
        Payment payment = paymentService.getPayment(paymentId);
        PaymentResponseDto responseDto = new PaymentResponseDto(payment);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<PaymentResponseDto>> getPayments() {
        List<Payment> payments = paymentService.getPayments();
        List<PaymentResponseDto> responseDtoList = payments.stream()
                .map(PaymentResponseDto::new)
                .collect(Collectors.toList());
        return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
    }

    @DeleteMapping("/{payment-id}")
    public ResponseEntity<Void> deletePayment(
            @PathVariable("payment-id") @Positive Long paymentId) {
        paymentService.deletePayment(paymentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

