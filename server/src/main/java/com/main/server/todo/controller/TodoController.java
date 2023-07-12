package com.main.server.todo.controller;

import com.main.server.todo.domain.Todo;
import com.main.server.todo.dto.TodoDto;
import com.main.server.todo.dto.TodoDto.Response;
import com.main.server.todo.service.TodoService;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/todos")
@Validated
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PatchMapping("/{todo-id}/status")
    public ResponseEntity updateStatusTodo(@PathVariable("todo-id") @Positive Long todoId,
        @RequestBody TodoDto.updateStatus updateStatusDto) {
        Todo todo = todoService.updateStatusTodo(todoId, updateStatusDto);

        return new ResponseEntity(new Response(todo), HttpStatus.OK);
    }

    @GetMapping("/{todo-id}")
    public ResponseEntity getTodo(@PathVariable("todo-id") @Positive Long todoId) {
     Todo todo = todoService.getTodo(todoId);
     return new ResponseEntity(new Response(todo), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Response>> getTodos() {
        List<Todo> todos = this.todoService.getTodos();
        List<TodoDto.Response> responses = todos.stream()
            .map((todo -> new TodoDto.Response(todo)))
            .collect(Collectors.toList());

        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @DeleteMapping("/{todo-id}")
    public ResponseEntity deleteTodo(@PathVariable("todo-id") @Positive Long todoId) {
        todoService.deleteTodo(todoId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
