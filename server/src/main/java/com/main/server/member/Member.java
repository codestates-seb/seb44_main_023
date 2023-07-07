package com.main.server.member;

import com.main.server.member.dto.PatchDto;
import com.main.server.member.dto.ResponseDto;
import com.main.server.member.dto.SignUpDto;
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

    private String profileImagePath;

    private String registeredAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

    private LocalDateTime terminatedAt;

    @Column(nullable = false)
    private boolean terminated;


    public Member(SignUpDto signUpDto) {
        this.email = signUpDto.getEmail();
        this.nickname = signUpDto.getNickname();
        this.password = signUpDto.getPassword();
    }

    public Member(PatchDto patchDto) {
        this.nickname = patchDto.getNickname();
        this.password = patchDto.getPassword();
    }



}