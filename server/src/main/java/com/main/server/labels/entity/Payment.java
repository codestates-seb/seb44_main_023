package com.main.server.labels.entity;

import com.main.server.ledger.entity.Ledger;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long paymentId;

    @Column(name = "payment_name", length = 100)
    private String paymentName;

//    @ManyToOne
//    @JoinColumn(name = "member_id")
//    private Member member;
//    public void addMember(Member member) {
//        this.member = member;
//    }

    @OneToMany(mappedBy = "payment")
    private List<Ledger> ledgers = new ArrayList<>();

    public Payment(String paymentName) {
//        this.member = member;
        this.paymentName = paymentName;
    }

    public void changeName(String name) {
        if (name != null) {
            this.paymentName = name;
        }
    }

}
