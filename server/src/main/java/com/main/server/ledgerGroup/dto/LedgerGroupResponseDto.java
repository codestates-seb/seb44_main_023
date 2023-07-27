package com.main.server.ledgerGroup.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.ledgerGroup.entity.LedgerGroup;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LedgerGroupResponseDto {

//    @JsonProperty(value = "member_id")
//    private Long memberId;

    @JsonProperty(value = "ledger_group_id")
    private Long ledgerGroupId;

    @JsonProperty(value = "ledger_group_title")
    private String ledgerGroupTitle;

    public LedgerGroupResponseDto(LedgerGroup ledgerGroup) {
//        this.memberId = ledgerGroup.getMember().getMemberId();
        this.ledgerGroupId = ledgerGroup.getLedgerGroupId();
        this.ledgerGroupTitle = ledgerGroup.getLedgerGroupTitle();
    }
}
