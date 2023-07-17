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
    INVALID_PASSWORD(400, "Invalid new password"),
    EMAIL_ALREADY_USED(409, "이미 사용 중인 이메일입니다."),
    PASSWORD_DOES_NOT_MATCH(401, "비밀번호가 틀렸습니다."),
    EMAIL_NOT_REGISTERED(404, "등록되지 않은 이메일입니다."),
    NICKNAME_ALREADY_USED(409, "이미 사용 중인 닉네임입니다."),
    SAME_NICKNAME(400, "현재 사용 중인 닉네임과 동일합니다."),
    INVALID_NICKNAME_FORMAT(401, "닉네임은 특수문자를 제외한 2~10자리여야 합니다."),
    SAME_CURRENT_PASSWORD(409, "현재 비밀번호와 일치합니다."),
    INVALID_PASSWORD_FORMAT(400, "비밀번호 형식이 올바르지 않습니다."),
    LEDGER_NOT_FOUND(404, "Ledger not found"),
    LEDGER_GROUP_NOT_FOUND(404, "LedgerGroup not found"),

    INVALID_ACCESS_TOKEN(400, "유효하지 않은 Access Token입니다."),
    INVALID_REFRESH_TOKEN (401, "유효하지 않은 Refresh Token입니다."),
    INVALID_EMAIL(409, "유효하지 않은 이메일입니다."),
    INVALID_NICKNAME(401, "유효하지 않은 닉네임입니다."),
    CATEGORY_NOT_FOUND(404, "Category not found"),
    PAYMENT_NOT_FOUND(404, "Payment not found"),
    INOUTCOME_NOT_FOUND(404, "Inoutcome not found");



    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
