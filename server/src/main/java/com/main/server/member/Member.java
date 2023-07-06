package com.main.server.member;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;


import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@NoArgsConstructor
@Data
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column(nullable = false, unique = true)
    private String email;

    private String password;

    @Column(nullable = false)
    private String nickname;

    // profile 이미지 필드 한 줄로 주면 되는지?
    private String profileImage;

    @Column(nullable = false)
    private String registeredAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

    private String terminatedAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

    @Column(nullable = false)
    private boolean terminated;

    public Member(MemberDto memberDto) {
        this.email = memberDto.getEmail();
        this.nickname = memberDto.getNickname();
    }
}