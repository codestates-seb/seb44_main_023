package com.main.server.ledgerGroup.invitationDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.ledgerGroup.entity.LedgerGroup;
import com.main.server.member.Member;

import javax.validation.constraints.NotEmpty;
import java.util.List;
import java.util.stream.Collectors;

public class InvitationLedgerGroupResponseDto {

    @JsonProperty(value = "member_id")
    private Long memberId;
    @JsonProperty(value = "ledger_group_id")
    private Long ledgerGroupId;
    @NotEmpty
    @JsonProperty(value = "emails")
    private List<InvitationEmailDto> emails;

    public InvitationLedgerGroupResponseDto(LedgerGroup ledgerGroup) {
        this.memberId = ledgerGroup.getMember().getMemberId();
        this.ledgerGroupId = ledgerGroup.getLedgerGroupId();

        List<Member> members = ledgerGroup.getLedgerGroupMembers().stream()
                .map((gm) -> gm.getMember())
                .collect(Collectors.toList());

        this.emails = members.stream()
                .map((m) -> m.getEmail())
                .map((e) -> new InvitationEmailDto(e))
                .collect(Collectors.toList());
    }


}
