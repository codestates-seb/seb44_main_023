package com.main.server.labels.paymentdto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.labels.entity.Category;
import com.main.server.labels.entity.Payment;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PaymentResponseDto {

    @JsonProperty(value = "member_id")
    private Long memberId;

    @JsonProperty(value = "payment_id")
    private Long paymentId;

    @JsonProperty(value = "payment_name")
    private String paymentName;

    public PaymentResponseDto(Payment payment) {
        this.memberId = payment.getMember().getMemberId();
        this.paymentId = payment.getPaymentId();
        this.paymentName = payment.getPaymentName();
    }


}
