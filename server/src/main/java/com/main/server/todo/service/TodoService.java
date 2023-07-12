package com.main.server.todo.service;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.todo.domain.Todo;
import com.main.server.todo.domain.TodoStatus;
import com.main.server.todo.dto.TodoDto;
import com.main.server.todo.repository.TodoRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
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
    private Todo findVerifiedTodo(Long todoId) {
        Todo findTodo = todoRepository.findById(todoId).orElseThrow(() ->
            new BusinessLogicException(ExceptionCode.TODO_NOT_FOUND));
        return findTodo;
    }
}
