package com.main.server.todo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.member.Member;
import com.main.server.todo.domain.Todo;
import com.main.server.todo.domain.TodoStatus;
import com.main.server.todogroup.domain.TodoGroup;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

        public Todo toEntity(Member member, TodoGroup todoGroup) {
            LocalDate date = LocalDate.parse(todoScheduleDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            return new Todo(member, todoGroup ,todoTitle, todoContent, date);
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

    }

    @Getter
    @AllArgsConstructor
    public static class Response {

        @JsonProperty(value = "member_id")
        private Long memberId;
        @JsonProperty(value = "todo_group_id")
        private Long todoGroupId;
        @JsonProperty(value = "todo_id")
        private Long todoId;
        @JsonProperty(value = "todo_title")
        private String todoTitle;
        @JsonProperty(value = "todo_content")
        private String todoContent;
        @JsonProperty(value = "todo_schedule_date")
        private String todoScheduleDate;
        @JsonProperty(value = "todo_status")
        private TodoStatus todoStatus;

        public Response(Todo todo) {
            this.memberId = todo.getMember().getMemberId();
            this.todoGroupId = todo.getTodoGroup().getTodoGroupId();
            this.todoId = todo.getTodoId();
            this.todoTitle = todo.getTodoTitle();
            this.todoContent = todo.getTodoContent();
            this.todoScheduleDate = String.valueOf(todo.getTodoScheduleDate());
            this.todoStatus = todo.getTodoStatus();
        }

    }

    @Getter
    public static class updateStatus {
        private String status;
    }

}
