package com.main.server.ledgerGroup.entity;

import com.main.server.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class LedgerGroupMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "ledger_group_member_id")
    private Long ledgerGroupMemberId;

    @ManyToOne
    @JoinColumn(name = "ledger_group_id")
    private LedgerGroup ledgerGroup;


    public void addLedgerGroup(LedgerGroup ledgerGroup) {
        this.ledgerGroup = ledgerGroup;
    }

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public void addMember(Member member) {
        this.member = member;
    }

    public LedgerGroupMember(LedgerGroup ledgerGroup, Member member) {
        this.ledgerGroup = ledgerGroup;
        this.member = member;
    }

}

