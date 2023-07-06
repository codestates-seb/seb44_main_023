package com.main.server.member.dto;

import lombok.Data;

@Data
public class MemberPatchDto {

    private String nickname;
    private String password;
    private String profileImage;

}
