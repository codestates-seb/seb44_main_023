package com.main.server.member.dto;

import lombok.Data;

import javax.validation.constraints.Pattern;

@Data
public class NicknameDto {

    @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-zA-Z0-9-_]{2,10}$",
             message = "닉네임은 특수문자를 제외한 2~10자리여야 합니다.")
    private String nickname;

}
