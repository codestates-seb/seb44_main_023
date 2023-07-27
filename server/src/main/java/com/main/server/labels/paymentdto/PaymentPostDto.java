package com.main.server.labels.paymentdto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.labels.entity.Payment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentPostDto {

//    @JsonProperty(value = "member_id")
//    private Long memberId;

    @JsonProperty(value = "payment_name")
    private String paymentName;

    public Payment toEntity() {
        return new Payment(paymentName);
    }
}
