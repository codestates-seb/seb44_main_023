package com.main.server.todo.service;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.member.Member;
import com.main.server.member.MemberService;
import com.main.server.security.JwtTokenizer;
import com.main.server.todo.domain.Todo;
import com.main.server.todo.domain.TodoStatus;
import com.main.server.todo.dto.TodoDto;
import com.main.server.todo.repository.TodoRepository;
import com.main.server.todogroup.domain.TodoGroup;
import com.main.server.todogroup.service.TodoGroupService;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.expression.ExpressionException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class TodoService {

    private final TodoRepository todoRepository;
    private final MemberService memberService;
    private final TodoGroupService todoGroupService;
    private JwtTokenizer jwtTokenizer;

    public TodoService(TodoRepository todoRepository, MemberService memberService,
        TodoGroupService todoGroupService, JwtTokenizer jwtTokenizer) {
        this.todoRepository = todoRepository;
        this.memberService = memberService;
        this.todoGroupService = todoGroupService;
        this.jwtTokenizer = jwtTokenizer;
    }

    public Todo createTodo(Long todoGroupId, TodoDto.Post postDto, String token) {

        // 토큰 검증 및 memberId 식별
        long memberId = jwtTokenizer.getMemberIdFromToken(token);

        // memberId를 사용하여 회원 정보 확인
        Member member = memberService.findMember(memberId);
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }


        TodoGroup todoGroup = todoGroupService.findById(todoGroupId);
        Todo savedTodo = todoRepository.save(postDto.toEntity(member, todoGroup));

        return savedTodo;
    }

    public Todo updateTodo(Long todoGroupId, Long todoId ,TodoDto.Patch patchDto, String accessToken) {
        todoGroupService.findById(todoGroupId);

        Todo findTodo = findVerifiedTodo(todoId);
        findTodo.changeTitle(patchDto.getTodoTitle());
        findTodo.changeContent(patchDto.getTodoContent());
//        findTodo.changeScheduleDate(LocalDate.parse(patchDto.getTodoScheduleDate()));
        LocalDate scheduleDate = null;
        if (patchDto.getTodoScheduleDate() != null) {
            scheduleDate = LocalDate.parse(patchDto.getTodoScheduleDate());
        }
        findTodo.changeScheduleDate(scheduleDate);

        return findTodo;
    }

    @Transactional
    public Todo updateStatusTodo(Long todoGroupId, Long todoId, TodoDto.updateStatus updateStatusDto, String accessToken) {
        todoGroupService.findById(todoGroupId);

        Todo findTodo = findVerifiedTodo(todoId);
        TodoStatus todoStatus = TodoStatus.valueOf(updateStatusDto.getStatus().toUpperCase());
        findTodo.updateStatus(todoStatus);

        return findTodo;
    }

    @Transactional
    public Todo getTodo(Long todoGroupId, Long todoId, String accessToken) {
        todoGroupService.findById(todoGroupId);

        return findVerifiedTodo(todoId);
    }

    @Transactional
    public List<Todo> getTodos(Long todoGroupId, String accessToken) {

//        todoGroupService.findById(todoGroupId);
//        List<Todo> todos = this.todoRepository.findAll();
//        return todos;

//        todoGroupService.findById(todoGroupId);
//        List<Todo> todos = this.todoRepository.findByTodoGroup(todoGroupId);
//        return todos;

        TodoGroup todoGroup = todoGroupService.findById(todoGroupId);

        List<Todo> todos = todoGroup.getTodos();
        return todos;
    }

    public List<Todo> dateGetTodos(Long todoGroupId, LocalDate startDate, LocalDate endDate, boolean includeNoDate, String accessToken) {
        TodoGroup todoGroup = todoGroupService.findById(todoGroupId);

//        List<Todo> todos = this.todoRepository.findByTodoGroupAndTodoScheduleDateBetween(todoGroup ,startDate, endDate);
//        todos.sort(Comparator.comparing(Todo::getTodoScheduleDate));
//        return todos;

        List<Todo> todos;

        todos = this.todoRepository.findByTodoGroupAndTodoScheduleDateBetween(todoGroup, startDate, endDate);
        if(includeNoDate) {
            todos.addAll(this.todoRepository.findByTodoGroupAndTodoScheduleDateIsNull(todoGroup));
        }

        return todos.stream()
            .sorted(Comparator.comparing(Todo::getTodoScheduleDate, Comparator.nullsFirst(Comparator.naturalOrder())))
            .collect(Collectors.toList());

    }

    public void deleteTodo(Long todoGroupId, Long todoId, String accessToken) {
        todoGroupService.findById(todoGroupId);

        Todo findTodo = findVerifiedTodo(todoId);
        todoRepository.delete(findTodo);
    }

    @Transactional(readOnly = true)
    public Todo findById(final Long todoId) {
        return todoRepository.findById(todoId)
            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TODO_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Todo findVerifiedTodo(Long todoId) {
        Todo findTodo = todoRepository.findById(todoId).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.TODO_NOT_FOUND));
        return findTodo;
    }
}
