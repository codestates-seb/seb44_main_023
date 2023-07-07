package com.main.server.member;

import com.main.server.member.dto.MemberPatchDto;
import com.main.server.member.dto.MemberPostDto;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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

    @Column(nullable = false, unique = true)
    private String nickname;

    // profile 이미지 필드 한 줄로 주면 되는지?
    private String profileImage;

    @Column(nullable = false)
    private String registeredAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

    private String terminatedAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

    @Column(nullable = false)
    private boolean terminated;

    public Member(MemberPostDto memberPostDto) {
        this.email = memberPostDto.getEmail();
        this.nickname = memberPostDto.getNickname();
    }

    public Member(MemberPatchDto memberPatchDto) {
        this.nickname = memberPatchDto.getNickname();
        this.password = memberPatchDto.getPassword();
        this.profileImage = memberPatchDto.getProfileImage();
    }
}