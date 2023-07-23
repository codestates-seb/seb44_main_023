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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
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

    @Value("${file.upload.path}")
    private String fileUploadPath;

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

            // AccessToken 유효성 검사
            if (!jwtTokenizer.validateToken(token)) {
                // AccessToken이 만료된 경우 RefreshToken으로 갱신 시도
                if (refreshToken != null && jwtTokenizer.validateRefreshToken(refreshToken)) {
                    // Refresh Token 검증 및 memberId 식별
                    long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

                    // memberId를 사용하여 회원 정보 확인
                    Member verifiedMember = memberService.findMember(memberId);

                    if (verifiedMember == null) {
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
                    }

                    // 새로운 AccessToken 발급
                    String newAccessToken = jwtTokenizer.generateAccessToken(verifiedMember.getEmail(), verifiedMember.getMemberId());

                    // 새로운 AccessToken으로 인증 및 인가 처리
                    HttpHeaders headers = new HttpHeaders();
                    headers.add("Authorization", "Bearer " + newAccessToken);

                    // 코멘트 작성
                    Comment comment = commentService.createComment(todoGroupId, todoId, postDto, newAccessToken);

                    return new ResponseEntity<>(new Response(comment, fileUploadPath), headers, HttpStatus.CREATED);
                } else {
                    // RefreshToken이 만료되었을 경우, 새로운 로그인 요청
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다. 다시 로그인해주세요");
                }
            }

            // AccessToken이 유효한 경우
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            // 코멘트 작성
            Comment comment = commentService.createComment(todoGroupId, todoId, postDto, token);

            return new ResponseEntity<>(new Response(comment, fileUploadPath), HttpStatus.CREATED);
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

            // AccessToken 유효성 검사
            if (!jwtTokenizer.validateToken(token)) {
                // AccessToken이 만료된 경우 RefreshToken으로 갱신 시도
                if (refreshToken != null && jwtTokenizer.validateRefreshToken(refreshToken)) {
                    // Refresh Token 검증 및 memberId 식별
                    long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

                    // memberId를 사용하여 회원 정보 확인
                    Member verifiedMember = memberService.findMember(memberId);

                    if (verifiedMember == null) {
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
                    }

                    // 새로운 AccessToken 발급
                    String newAccessToken = jwtTokenizer.generateAccessToken(verifiedMember.getEmail(), verifiedMember.getMemberId());

                    // 새로운 AccessToken으로 인증 및 인가 처리
                    HttpHeaders headers = new HttpHeaders();
                    headers.add("Authorization", "Bearer " + newAccessToken);

                    // 코멘트 수정
                    Comment comment = commentService.upDateComment(todoGroupId, todoId, commentId, patchDto, newAccessToken);

                    return new ResponseEntity<>(new Response(comment, fileUploadPath), headers, HttpStatus.OK);
                } else {
                    // RefreshToken이 만료되었을 경우, 새로운 로그인 요청
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다. 다시 로그인해주세요");
                }
            }

            // AccessToken이 유효한 경우
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            // 코멘트 수정
            Comment comment = commentService.upDateComment(todoGroupId, todoId, commentId, patchDto, token);

            return new ResponseEntity<>(new Response(comment, fileUploadPath), HttpStatus.OK);
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

            // AccessToken 유효성 검사
            if (!jwtTokenizer.validateToken(token)) {
                // AccessToken이 만료된 경우 RefreshToken으로 갱신 시도
                if (refreshToken != null && jwtTokenizer.validateRefreshToken(refreshToken)) {
                    // Refresh Token 검증 및 memberId 식별
                    long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

                    // memberId를 사용하여 회원 정보 확인
                    Member verifiedMember = memberService.findMember(memberId);

                    if (verifiedMember == null) {
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
                    }

                    // 새로운 AccessToken 발급
                    String newAccessToken = jwtTokenizer.generateAccessToken(verifiedMember.getEmail(), verifiedMember.getMemberId());

                    // 새로운 AccessToken으로 인증 및 인가 처리
                    HttpHeaders headers = new HttpHeaders();
                    headers.add("Authorization", "Bearer " + newAccessToken);

                    // 코멘트 리스트 획득
                    List<Comment> comments = commentService.getComments(todoGroupId, todoId, newAccessToken);
                    List<Response> responses = comments.stream()
                            .map((comment -> new Response(comment, fileUploadPath)))
                            .collect(Collectors.toList());

                    return new ResponseEntity<>(responses, headers, HttpStatus.OK);
                } else {
                    // RefreshToken이 만료되었을 경우, 새로운 로그인 요청
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다. 다시 로그인해주세요");
                }
            }

            // AccessToken이 유효한 경우
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            // 코멘트 리스트 획득
            List<Comment> comments = commentService.getComments(todoGroupId, todoId, token);
            List<Response> responses = comments.stream()
                    .map((comment -> new Response(comment, fileUploadPath)))
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

            // AccessToken 유효성 검사
            if (!jwtTokenizer.validateToken(token)) {
                // AccessToken이 만료된 경우 RefreshToken으로 갱신 시도
                if (refreshToken != null && jwtTokenizer.validateRefreshToken(refreshToken)) {
                    // Refresh Token 검증 및 memberId 식별
                    long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

                    // memberId를 사용하여 회원 정보 확인
                    Member verifiedMember = memberService.findMember(memberId);

                    if (verifiedMember == null) {
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
                    }

                    // 새로운 AccessToken 발급
                    String newAccessToken = jwtTokenizer.generateAccessToken(verifiedMember.getEmail(), verifiedMember.getMemberId());

                    // 새로운 AccessToken으로 인증 및 인가 처리
                    HttpHeaders headers = new HttpHeaders();
                    headers.add("Authorization", "Bearer " + newAccessToken);

                    // 코멘트 삭제
                    commentService.deleteComment(todoGroupId, todoId, commentId, newAccessToken);

                    return new ResponseEntity<>(headers, HttpStatus.NO_CONTENT);
                } else {
                    // RefreshToken이 만료되었을 경우, 새로운 로그인 요청
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다. 다시 로그인해주세요");
                }
            }

            // AccessToken이 유효한 경우
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            // 코멘트 삭제
            commentService.deleteComment(todoGroupId, todoId, commentId, token);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

}
