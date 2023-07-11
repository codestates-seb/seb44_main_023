package com.main.server.member.dto;

import com.main.server.member.Member;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
public class ResponseDto {
    private long memberId;
    private String email;
    private String password;
    private String nickname;
    private String registeredAt;
    private LocalDateTime terminatedAt;
    private boolean terminated;


    public ResponseDto(Member member) {
        this.memberId = member.getMemberId();
        this.email = member.getEmail();
        this.password = member.getPassword();
        this.nickname = member.getNickname();
        this.registeredAt = member.getRegisteredAt();
        this.terminatedAt = member.getTerminatedAt();
        this.terminated = member.isTerminated();
    }

}
