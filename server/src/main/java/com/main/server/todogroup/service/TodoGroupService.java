package com.main.server.todogroup.service;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.member.Member;
import com.main.server.member.MemberRepository;
import com.main.server.member.MemberService;
import com.main.server.todo.domain.Todo;
import com.main.server.todogroup.Repository.TodoGroupRepository;
import com.main.server.todogroup.domain.TodoGroup;
//import com.main.server.todogroup.dto.InvitationTodoGroup.Post;
import com.main.server.todogroup.dto.TodoGroupDto;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class TodoGroupService {
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final TodoGroupRepository todoGroupRepository;

    public TodoGroupService(MemberService memberService, MemberRepository memberRepository, TodoGroupRepository todoGroupRepository) {
        this.memberService = memberService;
        this.memberRepository = memberRepository;
        this.todoGroupRepository = todoGroupRepository;
    }

    public TodoGroup createTodoGroup(TodoGroupDto.Post postDto) {
        Member member = memberService.findMember(postDto.getMemberId());
        TodoGroup saveTodoGroup = todoGroupRepository.save(postDto.toEntity(member));

        return saveTodoGroup;
    }

    public TodoGroup updateTodoGroup(Long todoGroupId, TodoGroupDto.Patch patchDto) {
        TodoGroup findTodoGroup = findVerifiedTodoGroup(todoGroupId);

        findTodoGroup.changeTitle(patchDto.getTodoGroupTitle());

        return findTodoGroup;
    }

    @Transactional
    public TodoGroup getTodoGroup(Long todoGroupId) {
        return findVerifiedTodoGroup(todoGroupId);
    }

    @Transactional
    public List<TodoGroup> getTodoGroups() {
        List<TodoGroup> todoGroups = this.todoGroupRepository.findAll();
        return todoGroups;
    }

    public void deleteTodoGroup(Long todoGroupId) {
        TodoGroup findTodoGroup = findVerifiedTodoGroup(todoGroupId);
        todoGroupRepository.delete(findTodoGroup);
    }

    @Transactional
    public TodoGroup findById(final Long todoGroupId) {
        return todoGroupRepository.findById(todoGroupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TODO_GROUP_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public TodoGroup findVerifiedTodoGroup(Long todoGroupId) {
        TodoGroup findTodoGroup = todoGroupRepository.findById(todoGroupId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.TODO_GROUP_NOT_FOUND));
        return findTodoGroup;
    }
}