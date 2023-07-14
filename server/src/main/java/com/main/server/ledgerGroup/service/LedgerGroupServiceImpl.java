package com.main.server.ledgerGroup.service;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.ledgerGroup.entity.LedgerGroup;
import com.main.server.ledgerGroup.dto.LedgerGroupPostDto;
import com.main.server.ledgerGroup.dto.LedgerGroupPatchDto;
import com.main.server.ledgerGroup.repository.LedgerGroupRepository;
import com.main.server.member.Member;
import com.main.server.member.MemberService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class LedgerGroupServiceImpl implements LedgerGroupService {
    private final MemberService memberService;
    private final LedgerGroupRepository ledgerGroupRepository;

    public LedgerGroupServiceImpl(MemberService memberService, LedgerGroupRepository ledgerGroupRepository) {
        this.memberService = memberService;
        this.ledgerGroupRepository = ledgerGroupRepository;
    }

    @Override
    public LedgerGroup createLedgerGroup(LedgerGroupPostDto postDto) {
        Member member = memberService.findMember(postDto.getMemberId());
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
        ledgerGroupRepository.delete(foundLedgerGroup);
    }

    @Transactional(readOnly = true)
    public LedgerGroup findById(Long ledgerGroupId) {
        return ledgerGroupRepository.findById(ledgerGroupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.LEDGER_GROUP_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public LedgerGroup findVerifiedLedgerGroup(Long ledgerGroupId) {
        LedgerGroup foundLedgerGroup = ledgerGroupRepository.findById(ledgerGroupId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.LEDGER_GROUP_NOT_FOUND));
        return foundLedgerGroup;
    }
}

