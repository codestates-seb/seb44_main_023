package com.main.server.todogroup.controller;

import com.main.server.todogroup.domain.TodoGroup;
//import com.main.server.todogroup.dto.InvitationTodoGroup;
import com.main.server.todogroup.dto.TodoGroupDto;
import com.main.server.todogroup.dto.TodoGroupDto.Response;
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
@Validated
public class TodoGroupController {

    private final TodoGroupService todoGroupService;

    public TodoGroupController(TodoGroupService todoGroupService) {
        this.todoGroupService = todoGroupService;
    }

    @PostMapping("/todogroups")
    public ResponseEntity createTodoGroup(@Valid @RequestBody TodoGroupDto.Post postDto) {
        TodoGroup todoGroup = todoGroupService.createTodoGroup(postDto);

        return new ResponseEntity<>(new TodoGroupDto.Response(todoGroup), HttpStatus.CREATED);
    }

    @PatchMapping("/todogroups/{todo-group-id}")
    public ResponseEntity updateTodoGroup(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                          @Valid @RequestBody TodoGroupDto.Patch patchDto) {
        TodoGroup todoGroup = todoGroupService.updateTodoGroup(todoGroupId, patchDto);

        return new ResponseEntity(new Response(todoGroup), HttpStatus.OK);
    }

    @GetMapping("/todogroups/{todo-group-id}")
    public ResponseEntity getTodoGroup(@PathVariable("todo-group-id") @Positive Long todoGroupId) {
        TodoGroup todoGroup = todoGroupService.getTodoGroup(todoGroupId);
        return new ResponseEntity(new Response(todoGroup), HttpStatus.OK);
    }

    @GetMapping("/todogroups")
    public ResponseEntity<List<Response>> getTodoGroups() {
        List<TodoGroup> todoGroups = this.todoGroupService.getTodoGroups();
        List<TodoGroupDto.Response> responses = todoGroups.stream()
                .map((todoGroup -> new Response(todoGroup)))
                .collect(Collectors.toList());

        return new ResponseEntity<>(responses, HttpStatus.OK);

    }

    @DeleteMapping("/todogroups/{todo-group-id}")
    public ResponseEntity deleteTodoGroup(@PathVariable("todo-group-id") @Positive Long todoGroupId) {
        todoGroupService.deleteTodoGroup(todoGroupId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

