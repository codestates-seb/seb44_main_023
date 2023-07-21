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

@CrossOrigin
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

            // 토큰 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 회원 정보 확인 후 작업 수행
            Todo todo = todoService.createTodo(todoGroupId, postDto, token);

            return new ResponseEntity(new Response(todo), HttpStatus.CREATED);
        }

        else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

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

            // 토큰 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 회원 정보 확인 후 작업 수행
            Todo todo = todoService.updateTodo(todoGroupId, todoId, patchDto);

            return new ResponseEntity(new Response(todo), HttpStatus.OK);
        }

        else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            Todo todo = todoService.updateTodo(todoGroupId, todoId, patchDto);

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

            // 토큰 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 회원 정보 확인 후 작업 수행
            Todo todo = todoService.updateStatusTodo(todoGroupId, todoId, updateStatusDto);

            return new ResponseEntity(new Response(todo), HttpStatus.OK);
        }

        else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            Todo todo = todoService.updateStatusTodo(todoGroupId, todoId, updateStatusDto);

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

            // 토큰 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 회원 정보 확인 후 작업 수행
            Todo todo = todoService.getTodo(todoGroupId, todoId);
            return new ResponseEntity(new Response(todo), HttpStatus.OK);
        }

        else if (refreshToken != null) {
            // Refresh Token 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(refreshToken);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }

            Todo todo = todoService.getTodo(todoGroupId, todoId);
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

            // 토큰 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 회원 정보 확인 후 작업 수행
            List<Todo> todos = this.todoService.getTodos(todoGroupId);
            List<TodoDto.Response> responses = todos.stream()
                    .map((todo -> new TodoDto.Response(todo)))
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

            List<Todo> todos = this.todoService.getTodos(todoGroupId);
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
            List<Todo> todos = this.todoService.dateGetTodos(todoGroupId, startDate, endDate);
            List<TodoDto.Response> responses = todos.stream()
                    .map((todo -> new TodoDto.Response(todo)))
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

            List<Todo> todos = this.todoService.dateGetTodos(todoGroupId, startDate, endDate);
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

            // 토큰 검증 및 memberId 식별
            long memberId = jwtTokenizer.getMemberIdFromToken(token);

            // memberId를 사용하여 회원 정보 확인
            Member verifiedMember = memberService.findMember(memberId);

            if (verifiedMember == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다");
            }
            // 회원 정보 확인 후 작업 수행
            todoService.deleteTodo(todoGroupId, todoId);

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

            todoService.deleteTodo(todoGroupId, todoId);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다");
        }
    }
}
