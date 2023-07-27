package com.main.server.ledger.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.labels.entity.Category;
import com.main.server.labels.entity.Inoutcome;
import com.main.server.labels.entity.Payment;
import com.main.server.ledger.entity.Ledger;
import com.main.server.ledgerGroup.entity.LedgerGroup;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LedgerPostDto {

//    @JsonProperty(value = "member_id")
//    private Long memberId;

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
    @NotNull(message = "Inoutcome required")
    private Long inoutcomeId;

    @JsonProperty(value = "payment_id")
    private Long paymentId;

    public Ledger toEntity(LedgerGroup ledgerGroup, Category category, Inoutcome inoutcome, Payment payment) {
        LocalDate date = LocalDate.parse(ledgerDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        return new Ledger(ledgerGroup, ledgerTitle, ledgerContent, ledgerAmount, date, category, inoutcome, payment);
    }

    public Long getCategoryId() {
        return categoryId != null ? categoryId : null;
    }

//    public Long getInoutcomeId() {
//        return inoutcomeId != null ? inoutcomeId : null;
//    }
    public Long getInoutcomeId() {
         if (inoutcomeId == null) {
            throw new BusinessLogicException(ExceptionCode.INOUTCOME_REQUIRED);
         }
        return inoutcomeId;
    }
}
