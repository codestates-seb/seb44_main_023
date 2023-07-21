package com.main.server.todogroup.controller;

import com.main.server.member.Member;
import com.main.server.member.MemberService;
import com.main.server.security.JwtTokenizer;
import com.main.server.todogroup.domain.TodoGroup;
//import com.main.server.todogroup.dto.InvitationTodoGroup;
import com.main.server.todogroup.domain.TodoGroup;
// import com.main.server.todogroup.dto.InvitationTodoGroup;
import com.main.server.todogroup.dto.InvitationMemberDto;
import com.main.server.todogroup.dto.InvitationTodoGroupDto;
import com.main.server.todogroup.dto.TodoGroupDto;
import com.main.server.todogroup.dto.TodoGroupDto.Response;
import com.main.server.todogroup.service.TodoGroupService;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin
@RestController
@Validated
public class TodoGroupController {

    @Value("${file.upload.path}")
    private String fileUploadPath;

    private final TodoGroupService todoGroupService;
    private JwtTokenizer jwtTokenizer;
    private MemberService memberService;

    public TodoGroupController(TodoGroupService todoGroupService, JwtTokenizer jwtTokenizer, MemberService memberService) {
        this.todoGroupService = todoGroupService;
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
    }

    @PostMapping("/todogroups")
    public ResponseEntity createTodoGroup(@Valid @RequestBody TodoGroupDto.Post postDto,
                                          HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            // 토큰 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 회원 정보 확인 후 작업 수행
            TodoGroup todoGroup = todoGroupService.createTodoGroup(postDto, token);

            return new ResponseEntity<>(new TodoGroupDto.Response(todoGroup), HttpStatus.CREATED);
        }

        else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            TodoGroup todoGroup = todoGroupService.createTodoGroup(postDto, token);

            return new ResponseEntity<>(new TodoGroupDto.Response(todoGroup), HttpStatus.CREATED);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @PatchMapping("/todogroups/{todo-group-id}")
    public ResponseEntity updateTodoGroup(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                          @Valid @RequestBody TodoGroupDto.Patch patchDto,
                                          HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            // 토큰 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 회원 정보 확인 후 작업 수행
            TodoGroup todoGroup = todoGroupService.updateTodoGroup(todoGroupId, patchDto);

            return new ResponseEntity(new Response(todoGroup), HttpStatus.OK);
        }

        else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            TodoGroup todoGroup = todoGroupService.updateTodoGroup(todoGroupId, patchDto);

            return new ResponseEntity(new Response(todoGroup), HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @GetMapping("/todogroups/{todo-group-id}")
    public ResponseEntity getTodoGroup(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                       HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            // 토큰 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 회원 정보 확인 후 작업 수행
            TodoGroup todoGroup = todoGroupService.getTodoGroup(todoGroupId);
            return new ResponseEntity(new Response(todoGroup), HttpStatus.OK);
        }

        else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            TodoGroup todoGroup = todoGroupService.getTodoGroup(todoGroupId);
            return new ResponseEntity(new Response(todoGroup), HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @GetMapping("/todogroups")
    public ResponseEntity<List<Response>> getTodoGroups(HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            // 토큰 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 회원 정보 확인 후 작업 수행
            List<TodoGroup> todoGroups = this.todoGroupService.getTodoGroups();
            List<TodoGroupDto.Response> responses = todoGroups.stream()
                    .map((todoGroup -> new Response(todoGroup)))
                    .collect(Collectors.toList());

            return new ResponseEntity<>(responses, HttpStatus.OK);
        }

        else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            List<TodoGroup> todoGroups = this.todoGroupService.getTodoGroups();
            List<TodoGroupDto.Response> responses = todoGroups.stream()
                    .map((todoGroup -> new Response(todoGroup)))
                    .collect(Collectors.toList());

            return new ResponseEntity<>(responses, HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @DeleteMapping("/todogroups/{todo-group-id}")
    public ResponseEntity deleteTodoGroup(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                          HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            // 토큰 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 회원 정보 확인 후 작업 수행
            todoGroupService.deleteTodoGroup(todoGroupId);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            todoGroupService.deleteTodoGroup(todoGroupId);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @PostMapping("/todogroups/{todo-group-id}/invitation")
    public ResponseEntity invite(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                @Valid @RequestBody InvitationTodoGroupDto.Post invitationTodoGroupDto,
                                 HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        String refreshToken = request.getHeader("X-Refresh-Token");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 접두사 제거

            // 토큰 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 회원 정보 확인 후 작업 수행
            TodoGroup todoGroup = todoGroupService.invite(todoGroupId, invitationTodoGroupDto);
            return new ResponseEntity<>(new InvitationTodoGroupDto.Response(todoGroup), HttpStatus.CREATED);
        }

        else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            TodoGroup todoGroup = todoGroupService.invite(todoGroupId, invitationTodoGroupDto);
            return new ResponseEntity<>(new InvitationTodoGroupDto.Response(todoGroup), HttpStatus.CREATED);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @GetMapping("/todogroups/{todo-group-id}/members")
    public ResponseEntity inviteMember(@PathVariable("todo-group-id") @Positive Long todoGroupId) {
        TodoGroup todoGroup = todoGroupService.getInviteMember(todoGroupId);
        return new ResponseEntity(new InvitationMemberDto.Response(todoGroup, fileUploadPath), HttpStatus.OK);
    }
}

