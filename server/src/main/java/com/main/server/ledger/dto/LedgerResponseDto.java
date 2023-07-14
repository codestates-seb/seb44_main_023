package com.main.server.ledger.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.ledger.entity.Ledger;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LedgerResponseDto {

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

    public LedgerResponseDto(Ledger ledger) {
        this.memberId = ledger.getMember().getMemberId();
        this.ledgerId = ledger.getLedgerId();
        this.ledgerTitle = ledger.getLedgerTitle();
        this.ledgerContent = ledger.getLedgerContent();
        this.ledgerAmount = ledger.getLedgerAmount();
        this.ledgerDate = String.valueOf(ledger.getLedgerDate());
    }
}
