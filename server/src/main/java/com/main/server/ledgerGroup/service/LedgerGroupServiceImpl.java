package com.main.server.ledgerGroup.service;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.ledger.entity.Ledger;
import com.main.server.ledger.repository.LedgerRepository;
import com.main.server.ledgerGroup.dto.LedgerGroupPatchDto;
import com.main.server.ledgerGroup.dto.LedgerGroupPostDto;
import com.main.server.ledgerGroup.entity.LedgerGroup;
import com.main.server.ledgerGroup.invitationDto.InvitationLedgerGroupPostDto;
import com.main.server.ledgerGroup.repository.LedgerGroupRepository;
import com.main.server.member.Member;
import com.main.server.member.MemberRepository;
import com.main.server.member.MemberService;
import com.main.server.security.JwtTokenizer;
import com.main.server.todogroup.domain.TodoGroup;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class LedgerGroupServiceImpl implements LedgerGroupService {
    private final MemberService memberService;
    private final LedgerGroupRepository ledgerGroupRepository;
//    private final Ledger ledger;
    private final LedgerRepository ledgerRepository;
    private final MemberRepository memberRepository;
    private JwtTokenizer jwtTokenizer;

    public LedgerGroupServiceImpl(MemberService memberService, LedgerGroupRepository ledgerGroupRepository,
                                  LedgerRepository ledgerRepository, MemberRepository memberRepository,JwtTokenizer jwtTokenizer) {
        this.memberService = memberService;
        this.ledgerGroupRepository = ledgerGroupRepository;
        this.ledgerRepository = ledgerRepository;
        this.memberRepository = memberRepository;
        this.jwtTokenizer = jwtTokenizer;
    }

    @Override
    public LedgerGroup createLedgerGroup(LedgerGroupPostDto postDto, String token) {

        // 토큰 검증 및 memberId 식별
        long memberId = jwtTokenizer.getMemberIdFromToken(token);

        // memberId를 사용하여 회원 정보 확인
        Member member = memberService.findMember(memberId);
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        LedgerGroup savedLedgerGroup = ledgerGroupRepository.save(postDto.toEntity(member));

        return savedLedgerGroup;
    }

    @Override
    public LedgerGroup updateLedgerGroup(Long ledgerGroupId, LedgerGroupPatchDto patchDto) {
        LedgerGroup foundLedgerGroup = findVerifiedLedgerGroup(ledgerGroupId);

        foundLedgerGroup.changeTitle(patchDto.getLedgerGroupTitle());

        return foundLedgerGroup;
    }

    @Override
    @Transactional(readOnly = true)
    public LedgerGroup getLedgerGroup(Long ledgerGroupId) {
        return findVerifiedLedgerGroup(ledgerGroupId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LedgerGroup> getLedgerGroups() {
        return ledgerGroupRepository.findAll();
    }

    @Override
    public void deleteLedgerGroup(Long ledgerGroupId) {
        LedgerGroup foundLedgerGroup = findVerifiedLedgerGroup(ledgerGroupId);

        List<Ledger> allLedgersDelete = ledgerRepository.findByLedgerGroup(foundLedgerGroup);
        int size = allLedgersDelete.size();

        for (int i = 0; i < size; i++) {
            Ledger ledger = allLedgersDelete.get(i);
            ledgerRepository.delete(ledger);
        }
        ledgerGroupRepository.delete(foundLedgerGroup);
    }

    @Transactional
    public LedgerGroup findByGroupId(final Long ledgerGroupId) {
        return ledgerGroupRepository.findById(ledgerGroupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.LEDGER_GROUP_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public LedgerGroup findVerifiedLedgerGroup(Long ledgerGroupId) {
        LedgerGroup foundLedgerGroup = ledgerGroupRepository.findById(ledgerGroupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.LEDGER_GROUP_NOT_FOUND));
        return foundLedgerGroup;
    }

    @Transactional
    public LedgerGroup invite(Long ledgerGroupId, InvitationLedgerGroupPostDto invitationLedgerGroupPostDto) {
        LedgerGroup findLedgerGroup  = findVerifiedLedgerGroup(ledgerGroupId);
        Member owner = memberRepository.findById(invitationLedgerGroupPostDto.getMemberId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        if (!findLedgerGroup.isOwner(owner)) {
            throw new BusinessLogicException(ExceptionCode.IS_NOT_OWNER);
        }
        List<String> emails = invitationLedgerGroupPostDto.extractEmails();
        List<Member> membersByEmail = memberRepository.findByEmailIn(emails);
        if (emails.size() != membersByEmail.size()) {
            throw  new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        findLedgerGroup.invites(membersByEmail);
        return findLedgerGroup;
    }

    @Transactional
    public LedgerGroup getInvitedMember(Long ledgerGroupId) {
        return findVerifiedLedgerGroup(ledgerGroupId);
    }
}

