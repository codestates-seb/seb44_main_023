package com.main.server.labels.entity;

import com.main.server.ledger.entity.Ledger;
import com.main.server.member.Member;
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
public class Inoutcome {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "in_outcome_id")
    private Long inoutcomeId;

    @Column(name = "in_outcome_name", length = 100)
    private String inoutcomeName;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    public void addMember(Member member) {
        this.member = member;
    }

    @OneToMany(mappedBy = "in_outcome")
    private List<Ledger> ledgers = new ArrayList<>();

    public Inoutcome(Member member, String in_outcomeName) {
        this.member = member;
        this.inoutcomeName = inoutcomeName;
    }

    public void changeName(String name) {
        if (name != null) {
            this.inoutcomeName = name;
        }
    }

}

