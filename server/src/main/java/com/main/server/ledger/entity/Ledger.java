package com.main.server.ledger.entity;

import com.main.server.ledgerGroup.entity.LedgerGroup;
import com.main.server.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

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

    @Column(name = "ledger_schedule_date")
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

    public Ledger(Member member, LedgerGroup ledgerGroup, String ledgerTitle, String ledgerContent, Long ledgerAmount, LocalDate ledgerDate) {
        this.member = member;
        this.ledgerGroup = ledgerGroup;
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

    public void changeLedgerGroup(final LedgerGroup ledgerGroup) {
        if(ledgerGroup != null) {
            this.ledgerGroup = ledgerGroup;
        }
    }
}
