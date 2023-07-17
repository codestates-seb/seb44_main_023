package com.main.server.ledgerGroup.entity;

import com.main.server.ledger.entity.Ledger;
import com.main.server.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class LedgerGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ledger_group_id")
    private Long ledgerGroupId;

    @Column(name = "ledger_group_title", length = 100)
    private String ledgerGroupTitle;

//    @OneToMany(mappedBy = "ledgerGroup", cascade = CascadeType.ALL)
//    private List<LedgerGroupMember> ledgerGroupMembers = new ArrayList<>();

    @OneToMany(mappedBy = "ledgerGroup")
    private List<Ledger> ledgers = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public void addMember(Member member) {
        this.member = member;
    }

    public LedgerGroup(Member member, String ledgerGroupTitle) {
        this.member = member;
        this.ledgerGroupTitle = ledgerGroupTitle;
    }

    public void changeTitle(String title) {
        if (title != null) {
            this.ledgerGroupTitle = title;
        }
    }
}
