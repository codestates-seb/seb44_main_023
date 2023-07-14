package com.main.server.ledgerGroup.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LedgerGroupPatchDto {

    @JsonProperty(value = "ledger_group_id")
    private Long ledgerGroupId;

    @JsonProperty(value = "ledger_group_title")
    private String ledgerGroupTitle;

    public void setLedgerGroupId(Long ledgerGroupId) {
        this.ledgerGroupId = ledgerGroupId;
    }
}
