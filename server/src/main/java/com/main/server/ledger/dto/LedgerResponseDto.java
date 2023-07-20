package com.main.server.ledger.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.labels.entity.Category;
import com.main.server.labels.entity.Inoutcome;
import com.main.server.labels.entity.Payment;
import com.main.server.ledger.entity.Ledger;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LedgerResponseDto {

    @JsonProperty(value = "member_id")
    private Long memberId;

    @JsonProperty(value = "ledger_id")
    private Long ledgerId;

    @JsonProperty(value = "ledger_group_id")
    private Long ledgerGroupId;

    @JsonProperty(value = "ledger_title")
    private String ledgerTitle;

    @JsonProperty(value = "ledger_content")
    private String ledgerContent;

    @JsonProperty(value = "ledger_amount")
    private Long ledgerAmount;

    @JsonProperty(value = "ledger_schedule_date")
    private String ledgerDate;

    private CategoryDto category;

    private InoutcomeDto inoutcome;

    private PaymentDto payment;

//boolean includeCategory, boolean includeInoutcome, boolean includePayment
    public LedgerResponseDto(Ledger ledger) {
        this.memberId = ledger.getMember().getMemberId();
        this.ledgerGroupId = ledger.getLedgerGroup().getLedgerGroupId();
        this.ledgerId = ledger.getLedgerId();
        this.ledgerTitle = ledger.getLedgerTitle();
        this.ledgerContent = ledger.getLedgerContent();
        this.ledgerAmount = ledger.getLedgerAmount();
        this.ledgerDate = String.valueOf(ledger.getLedgerDate());
        this.category = new CategoryDto(ledger.getCategory());
        this.inoutcome = new InoutcomeDto(ledger.getInoutcome());
        this.payment = new PaymentDto(ledger.getPayment());
//        if (includeCategory) {
//            this.category = new CategoryDto(ledger.getCategory());
//        }
//        if (includeInoutcome) {
//            this.inoutcome = new InoutcomeDto(ledger.getInoutcome());
//        }
//        if (includePayment) {
//            this.payment = new PaymentDto(ledger.getPayment());
//        }
    }

        @Getter
        public static class CategoryDto {
            private Long categoryId;
            private String categoryName;

            public CategoryDto(Category category) {
                if (category != null) {
                    this.categoryId = category.getCategoryId();
                    this.categoryName = category.getCategoryName();
                }
            }
        }

        @Getter
        public static class InoutcomeDto {
            private Long inoutcomeId;
            private String inoutcomeName;

            public InoutcomeDto(Inoutcome inoutcome) {
                if (inoutcome != null) {
                    this.inoutcomeId = inoutcome.getInoutcomeId();
                    this.inoutcomeName = inoutcome.getInoutcomeName();
                }
            }
        }

        @Getter
        public static class PaymentDto {
            private Long paymentId;
            private String paymentName;

            public PaymentDto(Payment payment) {
                if (payment != null) {
                    this.paymentId = payment.getPaymentId();
                    this.paymentName = payment.getPaymentName();
                }
            }
        }
    }

