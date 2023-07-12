package com.main.server.todo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.todo.domain.Todo;
import com.main.server.todo.domain.TodoStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

public class TodoDto {

    @Getter
    @AllArgsConstructor
    public static class CreateTodo {

        @JsonProperty(value = "todo_title")
        private String todoTitle;

        @JsonProperty(value = "todo_content")
        private String todoContent;

        @JsonProperty(value = "todo_schedule_date")
        private String todoScheduleDate;


    }

    @Getter
    @AllArgsConstructor
    public static class UpdateTodo {
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
            this.todoId = todo.getTodoId();
            this.todoTitle = todo.getTodoTitle();
            this.todoContent = todo.getTodoContent();
            this.todoScheduleDate = todo.getTodoScheduleDate();
            this.todoStatus = todo.getTodoStatus();
        }

    }

    @Getter
    public static class updateStatus {
        private String status;
    }

}
