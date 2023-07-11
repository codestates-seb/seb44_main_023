package com.main.server.todo.service;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.member.Member;
import com.main.server.member.MemberService;
import com.main.server.todo.dto.TodoDto;
import com.main.server.todo.entity.Todo;
import com.main.server.todo.repository.TodoRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class TodoService {

    private final MemberService memberService;
    private final TodoRepository todoRepository;

    public TodoService(MemberService memberService, TodoRepository todoRepository) {
        this.memberService = memberService;
        this.todoRepository = todoRepository;
    }

    public Todo createTodo(TodoDto.Post postDto) {
        //Member에 대한 검증
        Member member = memberService.findMember(postDto.getMemberId());
        Todo savedTodo = todoRepository.save(postDto.toPostEntity(member));

        return savedTodo;
    }

    @Transactional
    public Todo updateTodo(Todo todo) {
        Todo findTodo = findVerifiedTodo(todo.getTodoId());

        Optional.ofNullable(todo.getTodoTitle())
            .ifPresent(title -> findTodo.setTodoTitle(title));
        Optional.ofNullable(todo.getTodoContent())
            .ifPresent(content -> findTodo.setTodoContent(content));
        Optional.ofNullable(todo.getTodoScheduleDate())
            .ifPresent(SD -> findTodo.setTodoScheduleDate(SD));

        return todoRepository.save(findTodo);
    }

    @Transactional(readOnly = true)

    public Todo getTodo(Long todoId) {
        return findVerifiedTodo(todoId);
    }
    @Transactional(readOnly = true)
    public List<Todo> getTodos() {
        List<Todo> todos = this.todoRepository.findAll();

        return todos;
    }

    public void deleteTodo(Long todoId) {
        Todo findTodo = findVerifiedTodo(todoId);
        todoRepository.delete(findTodo);
    }

    @Transactional(readOnly = true)
    private Todo findVerifiedTodo(Long todoId) {
        Optional<Todo> optionalTodo = todoRepository.findById(todoId);
        Todo findTodo =
            optionalTodo.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.TODO_NOT_FOUND));
        return findTodo;
    }
}
