package com.main.server.todogroup.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class TodoGroupMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "todo_group_member_id")
    private Long todoGroupMemberId;

    @ManyToOne
    @JoinColumn(name = "todo_group_id")
    private TodoGroup todoGroup;


    public void addTodoGroup(TodoGroup todoGroup) {
        this.todoGroup = todoGroup;
    }

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public void addMember(Member member) {
        this.member = member;
    }

    public TodoGroupMember(TodoGroup todoGroup, Member member) {
        this.todoGroup = todoGroup;
        this.member = member;
    }

}
