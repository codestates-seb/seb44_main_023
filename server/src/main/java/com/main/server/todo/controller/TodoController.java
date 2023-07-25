package com.main.server.todo.controller;

import com.main.server.member.Member;
import com.main.server.member.MemberService;
import com.main.server.security.JwtTokenizer;
import com.main.server.todo.domain.Todo;
import com.main.server.todo.dto.TodoDto;
import com.main.server.todo.dto.TodoDto.Response;
import com.main.server.todo.service.TodoService;
import com.main.server.todogroup.domain.TodoGroup;
import com.main.server.todogroup.dto.TodoGroupDto;
import com.main.server.todogroup.service.TodoGroupService;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "https://codestates.shop")
@RestController
@Validated
public class TodoController {

    private final TodoService todoService;
    private JwtTokenizer jwtTokenizer;
    private MemberService memberService;

    public TodoController(TodoService todoService, JwtTokenizer jwtTokenizer, MemberService memberService) {
        this.todoService = todoService;
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;

    }


    @PostMapping("/todogroups/{todo-group-id}/todos")
    public ResponseEntity createTodo(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                     @Valid @RequestBody TodoDto.Post postDto,
                                     HttpServletRequest request){

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

                    // Todo 생성
                    Todo todo = todoService.createTodo(todoGroupId, postDto, newAccessToken);
                    return new ResponseEntity(new Response(todo), HttpStatus.CREATED);
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

            // Todo 생성
            Todo todo = todoService.createTodo(todoGroupId, postDto, token);
            return new ResponseEntity(new Response(todo), HttpStatus.CREATED);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

    @PatchMapping("/todogroups/{todo-group-id}/todos/{todo-id}")
    public ResponseEntity patchTodo(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                    @PathVariable("todo-id") @Positive Long todoId,
                                    @Valid @RequestBody TodoDto.Patch patchDto,
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

                    // Todo 수정
                    Todo todo = todoService.updateTodo(todoGroupId, todoId, patchDto, newAccessToken);
                    return new ResponseEntity(new Response(todo), HttpStatus.OK);
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

            // Todo 수정
            Todo todo = todoService.updateTodo(todoGroupId, todoId, patchDto, token);
            return new ResponseEntity(new Response(todo), HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }


    @PatchMapping("/todogroups/{todo-group-id}/todos/{todo-id}/status")
    public ResponseEntity updateStatusTodo(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                           @PathVariable("todo-id") @Positive Long todoId,
                                           @RequestBody TodoDto.updateStatus updateStatusDto,
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

                    // Todo 상태 업데이트
                    Todo todo = todoService.updateStatusTodo(todoGroupId, todoId, updateStatusDto, newAccessToken);
                    return new ResponseEntity(new Response(todo), HttpStatus.OK);
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

            // Todo 상태 업데이트
            Todo todo = todoService.updateStatusTodo(todoGroupId, todoId, updateStatusDto, token);
            return new ResponseEntity(new Response(todo), HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }


    @GetMapping("/todogroups/{todo-group-id}/todos/{todo-id}")
    public ResponseEntity getTodo(@PathVariable("todo-group-id") @Positive Long todoGroupId,
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

                    // Todo 조회
                    Todo todo = this.todoService.getTodo(todoGroupId, todoId, newAccessToken);

                    return new ResponseEntity(new Response(todo), headers, HttpStatus.OK);
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

            // Todo 조회
            Todo todo = this.todoService.getTodo(todoGroupId, todoId, token);

            return new ResponseEntity(new Response(todo), HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }


    @GetMapping("/todogroups/{todo-group-id}/todos")
    public ResponseEntity<List<Response>> getTodos(@PathVariable("todo-group-id") @Positive Long todoGroupId,
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

                    // Todo 조회
                    List<Todo> todos = this.todoService.getTodos(todoGroupId, newAccessToken);
                    List<TodoDto.Response> responses = todos.stream()
                            .map((todo -> new TodoDto.Response(todo)))
                            .collect(Collectors.toList());

                    return new ResponseEntity<>(responses, HttpStatus.OK);
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

            // Todo 조회
            List<Todo> todos = this.todoService.getTodos(todoGroupId, token);
            List<TodoDto.Response> responses = todos.stream()
                    .map((todo -> new TodoDto.Response(todo)))
                    .collect(Collectors.toList());

            return new ResponseEntity<>(responses, HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }


    @GetMapping("/todogroups/{todo-group-id}/todos/dates")
    public ResponseEntity<List<Response>> dateGetTodos(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                                       @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                       @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
                                                        @RequestParam(value = "includeNoDate", defaultValue = "false") boolean includeNoDate,
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

                    // Todo 조회

                    List<Todo> todos = this.todoService.dateGetTodos(todoGroupId, startDate, endDate, includeNoDate, newAccessToken);

                    List<TodoDto.Response> responses = todos.stream()
                            .map((todo -> new TodoDto.Response(todo)))
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

            // Todo 조회

            List<Todo> todos = this.todoService.dateGetTodos(todoGroupId, startDate, endDate, includeNoDate, token);

            List<TodoDto.Response> responses = todos.stream()
                    .map((todo -> new TodoDto.Response(todo)))
                    .collect(Collectors.toList());

            return new ResponseEntity<>(responses, HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }


    @DeleteMapping("/todogroups/{todo-group-id}/todos/{todo-id}")
    public ResponseEntity deleteTodo(@PathVariable("todo-group-id") @Positive Long todoGroupId,
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

                    // Todo 삭제
                    this.todoService.deleteTodo(todoGroupId, todoId, newAccessToken);

                    return new ResponseEntity(headers, HttpStatus.NO_CONTENT);
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

            // Todo 삭제
            this.todoService.deleteTodo(todoGroupId, todoId, token);

            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }

}
