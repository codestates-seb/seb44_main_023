package com.main.server.comment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.comment.domain.Comment;
import com.main.server.member.Member;
import com.main.server.todo.domain.Todo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class CommentDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {

//        @JsonProperty(value = "member_id")
//        private Long memberId;

        @JsonProperty(value = "comment_content")
        private String commentContent;

        public Comment toEntity(Member member, Todo todo) {
            return new Comment(member, todo, this.commentContent);
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {

//        @JsonProperty(value = "member_id")
//        private Long memberId;

        @JsonProperty(value = "comment_content")
        private String commentContent;

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
        @JsonProperty(value = "comment_id")
        private Long commentId;
        @JsonProperty(value = "nickname")
        private String nickName;
        @JsonProperty(value = "profile_image")
        private String profileImage;
        @JsonProperty(value = "comment_content")
        private String commentContent;

        public Response(Comment comment) {
            this.memberId = comment.getMember().getMemberId();
            this.todoGroupId = comment.getTodo().getTodoGroup().getTodoGroupId();
            this.todoId = comment.getTodo().getTodoId();
            this.commentId = comment.getCommentId();
            this.nickName = comment.getMember().getNickname();
            this.profileImage = comment.getMember().getProfileImage();
            this.commentContent = comment.getCommentContent();
        }

    }

}
