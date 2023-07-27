package com.main.server.ledgerGroup.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.ledgerGroup.entity.LedgerGroup;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LedgerGroupPostDto {

    @JsonProperty(value = "ledger_group_title")
    private String ledgerGroupTitle;

    public LedgerGroup toEntity() {
        return new LedgerGroup(ledgerGroupTitle);
    }
}
