package com.main.server.todo.service;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.member.Member;
import com.main.server.member.MemberService;
import com.main.server.todo.domain.Todo;
import com.main.server.todo.domain.TodoStatus;
import com.main.server.todo.dto.TodoDto;
import com.main.server.todo.repository.TodoRepository;
import com.main.server.todogroup.domain.TodoGroup;
import com.main.server.todogroup.service.TodoGroupService;
import java.time.LocalDate;
import java.util.List;
import org.springframework.expression.ExpressionException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class TodoService {

    private final TodoRepository todoRepository;

    private final MemberService memberService;

    public TodoService(TodoRepository todoRepository, MemberService memberService) {
        this.todoRepository = todoRepository;
        this.memberService = memberService;
    }

    public Todo createTodo(TodoDto.Post postDto) {
        //Member에 대한 검증

        Member member = memberService.findMember(postDto.getMemberId());
        Todo savedTodo = todoRepository.save(postDto.toEntity(member));

        return savedTodo;
    }

    public Todo updateTodo(Long todoId ,TodoDto.Patch patchDto) {
        Todo findTodo = findVerifiedTodo(todoId);

        findTodo.changeTitle(patchDto.getTodoTitle());
        findTodo.changeContent(patchDto.getTodoContent());
        findTodo.changeScheduleDate(LocalDate.parse(patchDto.getTodoScheduleDate()));

        return findTodo;
    }

    @Transactional
    public Todo updateStatusTodo(Long todoId, TodoDto.updateStatus updateStatusDto) {
        Todo findTodo = findVerifiedTodo(todoId);
        TodoStatus todoStatus = TodoStatus.valueOf(updateStatusDto.getStatus().toUpperCase());
        findTodo.updateStatus(todoStatus);

        return findTodo;
    }

    @Transactional
    public Todo getTodo(Long todoId) {
        return findVerifiedTodo(todoId);
    }

    @Transactional
    public List<Todo> getTodos() {
        List<Todo> todos = this.todoRepository.findAll();
        return todos;
    }

    public void deleteTodo(Long todoId) {
        Todo findTodo = findVerifiedTodo(todoId);
        todoRepository.delete(findTodo);
    }

    @Transactional(readOnly = true)
    public Todo findById(final Long todoId) {
        return todoRepository.findById(todoId)
            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TODO_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    private Todo findVerifiedTodo(Long todoId) {
        Todo findTodo = todoRepository.findById(todoId).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.TODO_NOT_FOUND));
        return findTodo;
    }
}
