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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@Validated
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }


    @PostMapping("/todogroups/{todo-group-id}/todos")
    public ResponseEntity createTodo(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                    @Valid @RequestBody TodoDto.Post postDto){
        Todo todo = todoService.createTodo(todoGroupId, postDto);

            return new ResponseEntity(new Response(todo), HttpStatus.CREATED);
    }

    @PatchMapping("/todogroups/{todo-group-id}/todos/{todo-id}")
    public ResponseEntity patchTodo(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                    @PathVariable("todo-id") @Positive Long todoId,
                                    @Valid @RequestBody TodoDto.Patch patchDto) {

        Todo todo = todoService.updateTodo(todoGroupId, todoId, patchDto);

        return new ResponseEntity(new Response(todo), HttpStatus.OK);
    }

    @PatchMapping("/todogroups/{todo-group-id}/todos/{todo-id}/status")
    public ResponseEntity updateStatusTodo(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                        @PathVariable("todo-id") @Positive Long todoId,
                                        @RequestBody TodoDto.updateStatus updateStatusDto) {
        Todo todo = todoService.updateStatusTodo(todoGroupId, todoId, updateStatusDto);

        return new ResponseEntity(new Response(todo), HttpStatus.OK);
    }

    @GetMapping("/todogroups/{todo-group-id}/todos/{todo-id}")
    public ResponseEntity getTodo(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                @PathVariable("todo-id") @Positive Long todoId) {
     Todo todo = todoService.getTodo(todoGroupId, todoId);
     return new ResponseEntity(new Response(todo), HttpStatus.OK);
    }

    @GetMapping("/todogroups/{todo-group-id}/todos")
    public ResponseEntity<List<Response>> getTodos(@PathVariable("todo-group-id") @Positive Long todoGroupId) {
        List<Todo> todos = this.todoService.getTodos(todoGroupId);
        List<TodoDto.Response> responses = todos.stream()
            .map((todo -> new TodoDto.Response(todo)))
            .collect(Collectors.toList());

        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @DeleteMapping("/todogroups/{todo-group-id}/todos/{todo-id}")
    public ResponseEntity deleteTodo(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                    @PathVariable("todo-id") @Positive Long todoId) {
        todoService.deleteTodo(todoGroupId, todoId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
