package com.main.server.comment.controller;

import com.main.server.comment.domain.Comment;
import com.main.server.comment.dto.CommentDto;
import com.main.server.comment.dto.CommentDto.Response;
import com.main.server.comment.service.CommentService;
import com.main.server.todo.service.TodoService;
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
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@Validated
@RestController
public class CommentController {

    private final CommentService commentService;
    private final TodoGroupService todoGroupService;
    private final TodoService todoService;

    public CommentController(CommentService commentService, TodoGroupService todoGroupService,
        TodoService todoService) {
        this.commentService = commentService;
        this.todoGroupService = todoGroupService;
        this.todoService = todoService;
    }

    @PostMapping("/todogroups/{todo-group-id}/todos/{todo-id}/comments")
    public ResponseEntity createComment(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                        @PathVariable("todo-id") @Positive Long todoId,
                                    @Valid @RequestBody CommentDto.Post postDto) {
        Comment comment = commentService.createComment(todoGroupId, todoId, postDto);

        return new ResponseEntity(new Response(comment), HttpStatus.CREATED);
    }

    @PatchMapping("/todogroups/{todo-group-id}/todos/{todo-id}/comments/{comment-id}")
    public ResponseEntity updateComment(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                        @PathVariable("todo-id") @Positive Long todoId,
                                        @PathVariable("comment-id") @Positive Long commentId,
                                    @Valid @RequestBody CommentDto.Patch patchDto) {
        Comment comment = commentService.upDateComment(todoGroupId, todoId, commentId, patchDto);

        return new ResponseEntity(new Response(comment), HttpStatus.OK);
    }

    @GetMapping("/todogroups/{todo-group-id}/todos/{todo-id}/comments")
    public ResponseEntity<List<Response>> getComments(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                                    @PathVariable("todo-id") @Positive Long todoId) {
        List<Comment> comments = this.commentService.getComments(todoGroupId, todoId);
        List<Response> responses = comments.stream()
            .map((comment -> new Response(comment)))
            .collect(Collectors.toList());

        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @DeleteMapping("/todogroups/{todo-group-id}/todos/{todo-id}/comments/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("todo-group-id") @Positive Long todoGroupId,
                                        @PathVariable("todo-id") @Positive Long todoId,
                                        @PathVariable("comment-id") @Positive Long commentId) {
        commentService.deleteComment(todoGroupId, todoId, commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
