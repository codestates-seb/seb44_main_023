package com.main.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    TODO_NOT_FOUND(404, "Todo not found"),
    TODO_GROUP_NOT_FOUND(404, "TodoGroup not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status"),
    INVALID_FILE_SIZE(400, "Invalid file size. Please upload an image between 5KB and 1MB."),
    INVALID_PASSWORD(400, "Invalid new password"),;

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
