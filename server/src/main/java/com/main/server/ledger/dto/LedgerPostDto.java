package com.main.server.ledger.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.ledger.entity.Ledger;
import com.main.server.ledgerGroup.entity.LedgerGroup;
import com.main.server.member.Member;
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

    public Ledger toEntity(Member member, LedgerGroup ledgerGroup) {
        LocalDate date = LocalDate.parse(ledgerDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        return new Ledger(member, ledgerGroup, ledgerTitle, ledgerContent, ledgerAmount, date);
    }
}
