package com.main.server.todo.controller;

import com.main.server.member.MemberService;
import com.main.server.todo.domain.Todo;
import com.main.server.todo.dto.TodoDto;
import com.main.server.todo.dto.TodoDto.Response;
import com.main.server.todo.service.TodoService;
import com.main.server.todogroup.domain.TodoGroup;
import com.main.server.todogroup.dto.TodoGroupDto;
import com.main.server.todogroup.service.TodoGroupService;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/todos")
@Validated
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }


    @PostMapping
    public ResponseEntity createTodo(@Valid @RequestBody TodoDto.Post postDto){
        Todo todo = todoService.createTodo(postDto);

            return new ResponseEntity(new Response(todo),
                HttpStatus.CREATED);
    }

    @PatchMapping("/{todo-id}")
    public ResponseEntity patchTodo(@PathVariable("todo-id") @Positive Long todoId,
                                    @Valid @RequestBody TodoDto.Patch patchDto) {

        Todo todo = todoService.updateTodo(todoId, patchDto);

        return new ResponseEntity(new Response(todo), HttpStatus.OK);
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
