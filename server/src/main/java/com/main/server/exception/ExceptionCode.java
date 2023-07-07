package com.main.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    TODO_NOT_FOUND(404, "Todo not found"),
    TODO_GROUP_NOT_FOUND(404, "TodoGroup not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
