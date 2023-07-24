package com.main.server.labels.paymentdto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentPatchDto {
    @JsonProperty(value = "payment_id")
    private Long paymentId;

    @JsonProperty(value = "payment_name")
    private String paymentName;

    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }
}