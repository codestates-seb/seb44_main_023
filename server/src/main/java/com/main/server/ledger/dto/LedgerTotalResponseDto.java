package com.main.server.ledger.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
//@AllArgsConstructor
@NoArgsConstructor
public class LedgerTotalResponseDto {
    @JsonProperty(value = "ledgers_by_date")
    private List<LedgerResponseDto> ledgers;
    @JsonProperty(value = "total_amount")
    private Long totalAmount;

    public LedgerTotalResponseDto(List<LedgerResponseDto> ledgers, Long totalAmount) {
        this.ledgers = ledgers;
        this.totalAmount = totalAmount;
    }
}