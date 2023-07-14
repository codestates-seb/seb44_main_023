package com.main.server.ledger.entity;

import com.main.server.ledgerGroup.entity.LedgerGroup;
import com.main.server.member.Member;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
public class Ledger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ledger_id")
    private Long ledgerId;

    @Column(name = "ledger_title", length = 100, nullable = false)
    private String ledgerTitle;

    @Column(name = "ledger_content", nullable = false)
    private String ledgerContent;

    @Column(name = "ledger_amount", nullable = false)
    private Long ledgerAmount;

    @Column(name = "ledger_date")
    private LocalDate ledgerDate;

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

    public Ledger(Member member, String ledgerTitle, String ledgerContent, Long ledgerAmount, LocalDate ledgerDate) {
        this.member = member;
        this.ledgerTitle = ledgerTitle;
        this.ledgerContent = ledgerContent;
        this.ledgerAmount = ledgerAmount;
        this.ledgerDate = ledgerDate;
    }


    public void changeTitle(final String title) {
        if(title != null) {
            this.ledgerTitle = title;
        }
    }

    public void changeContent(final String content) {
        if(content != null) {
            this.ledgerContent = content;
        }
    }

    public void changeAmount(final Long amount) {
        if(amount != null) {
            this.ledgerAmount = amount;
        }
    }

    public void changeDate(final LocalDate date) {
        if(date != null) {
            this.ledgerDate = date;
        }
    }

}
