package com.main.server.member;

import com.main.server.ledger.entity.Ledger;
import com.main.server.ledgerGroup.entity.LedgerGroup;
import com.main.server.member.dto.NicknameDto;
import com.main.server.member.dto.PasswordDto;
import com.main.server.member.dto.SignUpDto;
import com.main.server.comment.domain.Comment;
import com.main.server.todo.domain.Todo;
import com.main.server.todogroup.domain.TodoGroup;
import com.main.server.todogroup.domain.TodoGroupMember;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDateTime;

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
    private String refreshToken;


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

    public boolean isSameNickname(String nickname) {
        return this.nickname.equals(nickname);
    }
    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }


    @OneToMany(mappedBy = "member")
    private List<TodoGroupMember> todoGroupMembers = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Todo> todos = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<TodoGroup> todoGroups = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Ledger> ledgers = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<LedgerGroup> ledgerGroups = new ArrayList<>();


}