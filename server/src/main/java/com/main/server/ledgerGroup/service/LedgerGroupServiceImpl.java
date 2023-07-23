package com.main.server.ledgerGroup.service;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.ledger.entity.Ledger;
import com.main.server.ledger.repository.LedgerRepository;
import com.main.server.ledgerGroup.dto.LedgerGroupPatchDto;
import com.main.server.ledgerGroup.dto.LedgerGroupPostDto;
import com.main.server.ledgerGroup.entity.LedgerGroup;
import com.main.server.ledgerGroup.repository.LedgerGroupRepository;
import com.main.server.member.Member;
import com.main.server.member.MemberService;
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

    public LedgerGroupServiceImpl(MemberService memberService, LedgerGroupRepository ledgerGroupRepository,
                                  LedgerRepository ledgerRepository) {
        this.memberService = memberService;
        this.ledgerGroupRepository = ledgerGroupRepository;
//        this.ledger = ledger;
        this.ledgerRepository = ledgerRepository;
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
}

