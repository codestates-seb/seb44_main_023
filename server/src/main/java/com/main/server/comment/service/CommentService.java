package com.main.server.comment.service;

import com.main.server.comment.domain.Comment;
import com.main.server.comment.dto.CommentDto;
import com.main.server.comment.repository.CommentRepository;
import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.member.Member;
import com.main.server.member.MemberService;
import com.main.server.security.JwtTokenizer;
import com.main.server.todo.domain.Todo;
import com.main.server.todo.repository.TodoRepository;
import com.main.server.todo.service.TodoService;
import com.main.server.todogroup.Repository.TodoGroupRepository;
import com.main.server.todogroup.domain.TodoGroup;
import com.main.server.todogroup.service.TodoGroupService;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CommentService {

    private final MemberService memberService;
    private final TodoGroupService todoGroupService;
    private final TodoService todoService;
    private final CommentRepository commentRepository;
    private JwtTokenizer jwtTokenizer;

    public CommentService(MemberService memberService, TodoGroupService todoGroupService,
        TodoService todoService, CommentRepository commentRepository, JwtTokenizer jwtTokenizer) {
        this.memberService = memberService;
        this.todoGroupService = todoGroupService;
        this.todoService = todoService;
        this.commentRepository = commentRepository;
        this.jwtTokenizer = jwtTokenizer;
    }

    @Transactional
    public Comment createComment(Long todoGroupId, Long todoId, CommentDto.Post postDto, String token) {

        // 토큰 검증 및 memberId 식별
        long memberId = jwtTokenizer.getMemberIdFromToken(token);

        // memberId를 사용하여 회원 정보 확인
        Member member = memberService.findMember(memberId);
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        todoGroupService.findById(todoGroupId);
        Todo todo = todoService.findById(todoId);
        Comment savedComment = commentRepository.save(postDto.toEntity(member, todo));

        return savedComment;
    }

    public Comment upDateComment(Long todoGroupId, Long todoId, Long commentId, CommentDto.Patch patchDto) {
        todoGroupService.findById(todoGroupId);
        todoService.findById(todoId);
        Comment comment = findById(commentId);
        comment.changeContent(patchDto.getCommentContent());

        return comment;
    }

    @Transactional
    public List<Comment> getComments(Long todoGroupId, Long todoId) {
        TodoGroup todoGroup = todoGroupService.findById(todoGroupId);
        Todo todo = todoService.findById(todoId);

        List<Comment> comments = todo.getComments();

        return comments;
    }

    public void deleteComment(Long todoGroupId, Long todoId, Long commentId) {
        todoGroupService.findById(todoGroupId);
        todoService.findById(todoId);
        Comment findComment = findById(commentId);
        commentRepository.delete(findComment);
    }

    @Transactional(readOnly = true)
    public Comment findById(Long commentId) {
        return commentRepository.findById(commentId)
            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }


}
