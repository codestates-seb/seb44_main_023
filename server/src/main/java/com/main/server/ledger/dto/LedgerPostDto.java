package com.main.server.ledger.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.labels.entity.Inoutcome;
import com.main.server.labels.entity.Payment;
import com.main.server.ledger.entity.Ledger;
import com.main.server.ledgerGroup.entity.LedgerGroup;
import com.main.server.member.Member;
import com.main.server.labels.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Getter
@AllArgsConstructor
public class LedgerPostDto {

    @JsonProperty(value = "member_id")
    private Long memberId;

    @JsonProperty(value = "ledger_title")
    private String ledgerTitle;

    @JsonProperty(value = "ledger_content")
    private String ledgerContent;

    @JsonProperty(value = "ledger_amount")
    private Long ledgerAmount;

    @JsonProperty(value = "ledger_schedule_date")
    private String ledgerDate;

    @JsonProperty(value = "category_id")
    private Long categoryId;

    @JsonProperty(value = "in_outcome_id")
    private Long inoutcomeId;

    @JsonProperty(value = "payment_id")
    private Long paymentId;

    public Ledger toEntity(Member member, LedgerGroup ledgerGroup, Category category, Inoutcome inoutcome, Payment payment) {
        LocalDate date = LocalDate.parse(ledgerDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        return new Ledger(member, ledgerGroup, ledgerTitle, ledgerContent, ledgerAmount, date, category, inoutcome, payment);
    }

    public Long getCategoryId() {
        return categoryId != null ? categoryId : null;
    }

    public Long getInoutcomeId() {
        return inoutcomeId != null ? inoutcomeId : null;
    }
}
