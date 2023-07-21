package com.main.server.comment.controller;

import com.main.server.comment.domain.Comment;
import com.main.server.comment.dto.CommentDto;
import com.main.server.comment.dto.CommentDto.Response;
import com.main.server.comment.service.CommentService;
import com.main.server.member.Member;
import com.main.server.member.MemberService;
import com.main.server.security.JwtTokenizer;
import com.main.server.todo.service.TodoService;
import com.main.server.todogroup.service.TodoGroupService;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin
@Validated
@RestController
public class CommentController {

    private final CommentService commentService;
    private JwtTokenizer jwtTokenizer;
    private MemberService memberService;

    public CommentController(CommentService commentService, JwtTokenizer jwtTokenizer, MemberService memberService) {
        this.commentService = commentService;
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
    }

    @PostMapping("/todogroups/{todo-group-id}/todos/{todo-id}/comments")
    public ResponseEntity createComment(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                        @PathVariable("todo-id") @Positive Long todoId,
                                    @Valid @RequestBody CommentDto.Post postDto,
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
            Comment comment = commentService.createComment(todoGroupId, todoId, postDto, token);

            return new ResponseEntity(new Response(comment), HttpStatus.CREATED);
        }

        else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            Comment comment = commentService.createComment(todoGroupId, todoId, postDto, token);

            return new ResponseEntity(new Response(comment), HttpStatus.CREATED);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @PatchMapping("/todogroups/{todo-group-id}/todos/{todo-id}/comments/{comment-id}")
    public ResponseEntity updateComment(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                        @PathVariable("todo-id") @Positive Long todoId,
                                        @PathVariable("comment-id") @Positive Long commentId,
                                    @Valid @RequestBody CommentDto.Patch patchDto,
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
            Comment comment = commentService.upDateComment(todoGroupId, todoId, commentId, patchDto);

            return new ResponseEntity(new Response(comment), HttpStatus.OK);
        }

        else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            Comment comment = commentService.upDateComment(todoGroupId, todoId, commentId, patchDto);

            return new ResponseEntity(new Response(comment), HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @GetMapping("/todogroups/{todo-group-id}/todos/{todo-id}/comments")
    public ResponseEntity<List<Response>> getComments(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                                    @PathVariable("todo-id") @Positive Long todoId,
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
            List<Comment> comments = this.commentService.getComments(todoGroupId, todoId);
            List<Response> responses = comments.stream()
                    .map((comment -> new Response(comment)))
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

            List<Comment> comments = this.commentService.getComments(todoGroupId, todoId);
            List<Response> responses = comments.stream()
                    .map((comment -> new Response(comment)))
                    .collect(Collectors.toList());

            return new ResponseEntity<>(responses, HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @DeleteMapping("/todogroups/{todo-group-id}/todos/{todo-id}/comments/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                        @PathVariable("todo-id") @Positive Long todoId,
                                        @PathVariable("comment-id") @Positive Long commentId,
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
            commentService.deleteComment(todoGroupId, todoId, commentId);

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

            commentService.deleteComment(todoGroupId, todoId, commentId);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }
}
