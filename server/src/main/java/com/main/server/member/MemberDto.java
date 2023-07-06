package com.main.server.member;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberDto {

    private String email;
    private String password;
    private String nickname;


}
