package com.main.server.labels.paymentdto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.labels.entity.Inoutcome;
import com.main.server.labels.entity.Payment;
import com.main.server.member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PaymentPostDto {

    @JsonProperty(value = "member_id")
    private Long memberId;

    @JsonProperty(value = "payment_name")
    private String paymentName;

    public Payment toEntity(Member member) {
        return new Payment(member, paymentName);
    }
}
