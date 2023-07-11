package com.main.server.todo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.member.Member;
import com.main.server.todo.entity.Todo;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

public class TodoDto {

    @Getter
    @AllArgsConstructor
    public static class Post {

        @JsonProperty(value = "member_id")
        private Long memberId;

        @JsonProperty(value = "todo_title")
        private String todoTitle;

        @JsonProperty(value = "todo_content")
        private String todoContent;

        @JsonProperty(value = "todo_schedule_date")
        private String todoScheduleDate;

        public Todo toPostEntity(Member member) {
            return new Todo(member, todoTitle, todoContent, todoScheduleDate);
        }

    }

    @Getter
    @AllArgsConstructor
    public static class Patch {

        @JsonProperty(value = "member_id")
        private Long memberId;

        @JsonProperty(value = "todo_id")
        private Long todoId;

        @JsonProperty(value = "todo_title")
        private String todoTitle;

        @JsonProperty(value = "todo_content")
        private String todoContent;

        @JsonProperty(value = "todo_schedule_date")
        private String todoScheduleDate;

        public void setTodoId(Long todoId) {
            this.todoId = todoId;
        }

        public Todo toPatchEntity(Member member) {
            return new Todo(member, todoId, todoTitle, todoContent, todoScheduleDate);
        }

    }


    @Getter
    @AllArgsConstructor
    public static class Response {
        @JsonProperty(value = "member_id")
        private Long memberId;
        @JsonProperty(value = "todo_id")
        private Long todoId;
        @JsonProperty(value = "todo_title")
        private String todoTitle;
        @JsonProperty(value = "todo_content")
        private String todoContent;
        @JsonProperty(value = "todo_schedule_date")
        private String todoScheduleDate;

        public Response(Todo todo) {
            this.memberId = todo.getMember().getMemberId();
            this.todoId = todo.getTodoId();
            this.todoTitle = todo.getTodoTitle();
            this.todoContent = todo.getTodoContent();
            this.todoScheduleDate = todo.getTodoScheduleDate();
        }
    }
}
