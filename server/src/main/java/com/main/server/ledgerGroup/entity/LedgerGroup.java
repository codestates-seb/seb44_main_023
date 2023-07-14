package com.main.server.ledgerGroup.entity;

import com.main.server.member.Member;
import com.main.server.ledger.entity.Ledger;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
