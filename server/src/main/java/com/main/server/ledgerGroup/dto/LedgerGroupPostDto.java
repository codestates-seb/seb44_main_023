package com.main.server.ledgerGroup.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.ledgerGroup.entity.LedgerGroup;
import com.main.server.member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LedgerGroupPostDto {

   // @JsonProperty(value = "member_id")
   // private Long memberId;

    @JsonProperty(value = "ledger_group_title")
    private String ledgerGroupTitle;

    public LedgerGroup toEntity(Member member) {
        return new LedgerGroup(member, ledgerGroupTitle);
    }
}
