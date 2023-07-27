package com.main.server.ledger.entity;

import com.main.server.labels.entity.Category;
import com.main.server.labels.entity.Inoutcome;
import com.main.server.labels.entity.Payment;
import com.main.server.ledgerGroup.entity.LedgerGroup;
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

//    @ManyToOne
//    @JoinColumn(name = "member_id")
//    private Member member;

//    public void addMember(Member member) {
//        this.member = member;
//    }

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    public void addCategory(Category category) {
        this.category = category;
    }

    @ManyToOne
    @JoinColumn(name = "in_outcome_id")
    private Inoutcome inoutcome;

    public void addInoutcome(Inoutcome inoutcome) {
        this.inoutcome = inoutcome;
    }

    @ManyToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;

    public void addPayment(Payment payment) {
        this.payment = payment;
    }

    public Ledger(LedgerGroup ledgerGroup, String ledgerTitle, String ledgerContent,
                  Long ledgerAmount, LocalDate ledgerDate, Category category, Inoutcome inoutcome, Payment payment) {
//        this.member = member;
        this.ledgerGroup = ledgerGroup;
        this.ledgerTitle = ledgerTitle;
        this.ledgerContent = ledgerContent;
        this.ledgerAmount = ledgerAmount;
        this.ledgerDate = ledgerDate;
        this.category = category;
        this.inoutcome = inoutcome;
        this.payment = payment;
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

    public void changeCategory(Category category) {
        if(category != null) {
            this.category = category;
        }
    }

    public void changeInoutcome(Inoutcome inoutcome) {
        if(inoutcome != null) {
            this.inoutcome = inoutcome;
        }
    }

    public void changePayment(Payment payment) {
        if(payment != null) {
            this.payment = payment;
        }
    }

}
