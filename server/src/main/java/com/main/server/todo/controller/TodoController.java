package com.main.server.todo.controller;

import com.main.server.member.Member;
import com.main.server.todo.dto.TodoDto;
import com.main.server.todo.dto.TodoDto.Response;
import com.main.server.todo.entity.Todo;
import com.main.server.todo.service.TodoService;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping("/todos")
    public ResponseEntity postTodo(@Valid @RequestBody TodoDto.Post postDto) {
        Todo todo = todoService.createTodo(postDto);
        return new ResponseEntity<>(new Response(todo), HttpStatus.CREATED);
    }

    @PatchMapping("/todos/{todo-id}")
    public ResponseEntity patchTodo(@PathVariable("todo-id") @Positive Long todoId,
        @Valid @RequestBody TodoDto.Patch patchDto) {
        patchDto.setTodoId(todoId);

        Todo todo =
            todoService.updateTodo(patchDto.toPatchEntity(new Member()));

        return new ResponseEntity(new Response(todo), HttpStatus.OK);
    }

    @GetMapping("/todos/{todo-id}")
    public ResponseEntity getTodo(
        @PathVariable("todo-id") @Positive Long todoId) {
        Todo todo = todoService.getTodo(todoId);
        return new ResponseEntity(new Response(todo), HttpStatus.OK);
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Response>> getTodos() {
        List<Todo> todos = this.todoService.getTodos();
        List<TodoDto.Response> responses = todos.stream()
            .map((todo -> new TodoDto.Response(todo)))
            .collect(Collectors.toList());

        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @DeleteMapping("/todos/{todo-id}")
    public ResponseEntity deleteTodo(@PathVariable("todo-id") @Positive Long todoId) {
        todoService.deleteTodo(todoId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
