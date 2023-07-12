package com.main.server.todo.domain;

import com.main.server.member.Member;
import java.time.LocalDateTime;
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
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "todo_id")
    private Long todoId;

    @Column(name = "todo_title", length = 100, nullable = false)
    private String todoTitle;

    @Column(name = "todo_content", nullable = false)
    private String todoContent;

    @Column(name = "todo_schedule_date", nullable = true)
    private String todoScheduleDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "todo_status")
    private TodoStatus todoStatus = TodoStatus.INCOMPLETE;

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

    @OneToMany(mappedBy = "todo")
    private List<Comment> comments = new ArrayList<>();

    public void updateStatus(TodoStatus todoStatus) {
        this.todoStatus = todoStatus;
    }

}
