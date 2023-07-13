package com.main.server.todogroup.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.member.Member;
import com.main.server.todogroup.domain.TodoGroup;
import lombok.AllArgsConstructor;
import lombok.Getter;

public class TodoGroupDto {

    @Getter
    @AllArgsConstructor
    public static class Post {

        @JsonProperty(value = "member_id")
        private Long memberId;

        @JsonProperty(value = "todo_group_title")
        private String todoGroupTitle;

        public TodoGroup toEntity(Member member) {
            return new TodoGroup(member,todoGroupTitle);
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {

        @JsonProperty(value = "todo_group_id")
        private Long todoGroupId;

        @JsonProperty(value = "todo_group_title")
        private String todoGroupTitle;

        public void setTodoGroupId(Long todoGroupId) {
            this.todoGroupId = todoGroupId;
        }

    }

    @Getter
    @AllArgsConstructor
    public static class Response {

        @JsonProperty(value = "member_id")
        private Long memberId;

        @JsonProperty(value = "todo_group_id")
        private Long todoGroupId;

        @JsonProperty(value = "todo_group_title")
        private String todoGroupTitle;

        public Response(TodoGroup todoGroup) {

            this.memberId = todoGroup.getMember().getMemberId();
            this.todoGroupId = todoGroup.getTodoGroupId();
            this.todoGroupTitle = todoGroup.getTodoGroupTitle();

        }
    }

}
