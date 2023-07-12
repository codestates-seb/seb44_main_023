package com.main.server.member;

import com.main.server.member.dto.NicknameDto;
import com.main.server.member.dto.PasswordDto;
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

    private String newPassword;

    @Column(nullable = false, unique = true)
    private String nickname;

    private String profileImage;

    private String registeredAt;

    private LocalDateTime terminatedAt;

    @Column(nullable = false)
    private boolean terminated;


    public Member(SignUpDto signUpDto) {
        this.email = signUpDto.getEmail();
        this.nickname = signUpDto.getNickname();
        this.password = signUpDto.getPassword();
    }

    public Member(NicknameDto nicknameDto) {
        this.nickname = nicknameDto.getNickname();
    }

    public Member(PasswordDto passwordDto) {
        this.password = passwordDto.getPassword();
        this.newPassword = passwordDto.getNewPassword();
    }


//    @OneToMany(mappedBy = "member")
//    private List<TodoGroupMember> todoGroupMembers = new ArrayList<>();
//
//    @OneToMany(mappedBy = "member")
//    private List<Todo> todos = new ArrayList<>();
//
//    @OneToMany(mappedBy = "member")
//    private List<Comment> comments = new ArrayList<>();
//
//    @OneToOne(mappedBy = "member")
//    private TodoGroup todoGroup;
}