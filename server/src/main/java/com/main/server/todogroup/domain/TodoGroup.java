package com.main.server.todogroup.domain;

import com.main.server.member.Member;
import com.main.server.todo.domain.Todo;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
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
public class TodoGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "todo_group_id")
    private Long todoGroupId;

    @Column(name = "todo_group_title", length = 100)
    private String todoGroupTitle;

    @OneToMany(mappedBy = "todoGroup", cascade = CascadeType.ALL)
    private List<TodoGroupMember> todoGroupMembers = new ArrayList<>();

    @OneToMany(mappedBy = "todoGroup")
    private List<Todo> todos = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public void addMember(Member member) {
        this.member = member;
    }

    public TodoGroup(Member member, String todoGroupTitle) {
        this.member = member;
        this.todoGroupTitle = todoGroupTitle;
    }

    public void changeTitle(final String title) {
        if(title != null) {
            this.todoGroupTitle = title;
        }
    }

}
