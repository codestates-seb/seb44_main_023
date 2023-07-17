package com.main.server.ledger.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LedgerPatchDto {

    @JsonProperty(value = "member_id")
    private Long memberId;

    @JsonProperty(value = "ledger_id")
    private Long ledgerId;

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

    public void setLedgerId(Long ledgerId) {
        this.ledgerId = ledgerId;
    }
}
