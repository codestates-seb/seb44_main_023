package com.main.server.ledgerGroup.entity;

import com.main.server.ledger.entity.Ledger;
import com.main.server.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    @OneToMany(mappedBy = "ledgerGroup", cascade = CascadeType.ALL)
    private List<LedgerGroupMember> ledgerGroupMembers = new ArrayList<>();

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

    // 전달해준 멤버가 해당 그룹의 생성자인지 확인
    public boolean isOwner(Member member) {
        return this.member.getMemberId() == member.getMemberId();
    }

    // 전달받은 멤버들을 해당 그룹에 초대
    public void invites(List<Member> inviteMembers) {
        this.ledgerGroupMembers.addAll(
                inviteMembers.stream()
                        .map((m) -> new LedgerGroupMember(this, m))
                        .collect(Collectors.toList()));
    }
}
