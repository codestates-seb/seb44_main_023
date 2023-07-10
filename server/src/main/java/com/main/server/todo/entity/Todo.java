package com.main.server.todo.entity;

import com.main.server.comment.entity.Comment;
import com.main.server.member.Member;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

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

    @Column(name = "todo_status")
    private String todoStatus;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public void addMember(Member member) {
        this.member = member;
    }
    @OneToMany(mappedBy = "todo")
    private List<Comment> comments = new ArrayList<>();

    public Todo(Member member, String todoTitle, String todoContent, String todoScheduleDate) {
        this.member = member;
        this.todoTitle = todoTitle;
        this.todoContent = todoContent;
        this.todoScheduleDate = todoScheduleDate;
    }

    public Todo(Member member, Long todoId, String todoTitle, String todoContent, String todoScheduleDate) {
        this.member = member;
        this.todoId = todoId;
        this.todoTitle = todoTitle;
        this.todoContent = todoContent;
        this.todoScheduleDate = todoScheduleDate;
    }

}
