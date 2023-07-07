package com.main.server.member.dto;

import lombok.Data;

@Data
public class MemberPostDto {

    private String email;
    private String nickname;
    private String password;
    private String profileImage;
}
