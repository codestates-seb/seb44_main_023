package com.main.server.todogroup.service;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.member.Member;
import com.main.server.member.MemberRepository;
import com.main.server.member.MemberService;
import com.main.server.security.JwtTokenizer;
import com.main.server.todo.domain.Todo;
import com.main.server.todogroup.Repository.TodoGroupRepository;
import com.main.server.todogroup.domain.TodoGroup;
//import com.main.server.todogroup.dto.InvitationTodoGroup.Post;
// import com.main.server.todogroup.dto.InvitationTodoGroup.Post;
import com.main.server.todogroup.dto.InvitationTodoGroupDto;
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
    private JwtTokenizer jwtTokenizer;

    public TodoGroupService(MemberService memberService, MemberRepository memberRepository, TodoGroupRepository todoGroupRepository, JwtTokenizer jwtTokenizer) {
        this.memberService = memberService;
        this.memberRepository = memberRepository;
        this.todoGroupRepository = todoGroupRepository;
        this.jwtTokenizer = jwtTokenizer;
    }

    public TodoGroup createTodoGroup(TodoGroupDto.Post postDto, String token) {
        // 토큰 검증 및 memberId 식별
        long memberId = jwtTokenizer.getMemberIdFromToken(token);

        // memberId를 사용하여 회원 정보 확인
        Member member = memberService.findMember(memberId);
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

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

    @Transactional
    public TodoGroup invite(Long todoGroupId, InvitationTodoGroupDto.Post invitationTodoGroupDto) {
        TodoGroup findTodoGroup = findVerifiedTodoGroup(todoGroupId);
        Member owner = memberRepository.findById(invitationTodoGroupDto.getMemberId())
            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        if (!findTodoGroup.isOwner(owner)) {
            throw new BusinessLogicException(ExceptionCode.IS_NOT_OWNER);
        }

        // 초대하려는 Email이 실제 DB에 존재하는지 확인
        List<String> emails = invitationTodoGroupDto.extractEmails();
        List<Member> membersByEmail = memberRepository.findByEmailIn(emails);

        if (emails.size() != membersByEmail.size()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        findTodoGroup.invites(membersByEmail);
        return findTodoGroup;
    }

    @Transactional
    public TodoGroup getInviteMember(Long todoGroupId) {
        return findVerifiedTodoGroup(todoGroupId);
    }
}
