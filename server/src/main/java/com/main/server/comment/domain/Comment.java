package com.main.server.comment.domain;

import com.main.server.member.Member;
import com.main.server.todo.domain.Todo;
import javax.persistence.Column;
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
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentId;

    @Column(name = "comment_content")
    private String commentContent;

    @ManyToOne
    @JoinColumn(name = "todo_id")
    private Todo todo;


    public void addTodo(Todo todo) {
        this.todo = todo;
    }

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private void addMember(Member member) {
        this.member = member;
    }

    public Comment(Member member, Todo todo, String commentContent) {
        this.member = member;
        this.todo = todo;
        this.commentContent = commentContent;
    }
    public void changeContent(String commentContent) {
        if(commentContent != null) {
            this.commentContent = commentContent;
        }
    }
}
