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
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "category_name", length = 100)
    private String categoryName;

//    @ManyToOne
//    @JoinColumn(name = "member_id")
//    private Member member;
//    public void addMember(Member member) {
//        this.member = member;
//    }

    @OneToMany(mappedBy = "category")
    private List<Ledger> ledgers = new ArrayList<>();

    public Category(String categoryName) {
//        this.member = member;
        this.categoryName = categoryName;
    }

    public void changeName(String name) {
        if (name != null) {
            this.categoryName = name;
        }
    }

}
