package com.main.server.ledger.service;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.ledger.dto.LedgerPatchDto;
import com.main.server.ledger.dto.LedgerPostDto;
import com.main.server.ledger.entity.Ledger;
import com.main.server.ledger.repository.LedgerRepository;
import com.main.server.ledgerGroup.controller.LedgerGroupController;
import com.main.server.ledgerGroup.entity.LedgerGroup;
import com.main.server.ledgerGroup.service.LedgerGroupService;
import com.main.server.member.Member;
import com.main.server.member.MemberService;
import com.main.server.todo.domain.Todo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Transactional
@Service
public class LedgerServiceImpl implements LedgerService {

    private final LedgerRepository ledgerRepository;
    private final MemberService memberService;
    private final LedgerGroupService ledgerGroupService;

    public LedgerServiceImpl(LedgerRepository ledgerRepository, MemberService memberService,
                             LedgerGroupService ledgerGroupService) {
        this.ledgerRepository = ledgerRepository;
        this.memberService = memberService;
        this.ledgerGroupService = ledgerGroupService;
    }

    @Override
    public Ledger createLedger(Long ledgerGroupId, LedgerPostDto postDto) {
        Member member = memberService.findMember(postDto.getMemberId());
        LedgerGroup ledgerGroup =ledgerGroupService.findByGroupId(ledgerGroupId);
        Ledger savedLedger = ledgerRepository.save(postDto.toEntity(member, ledgerGroup));

        return savedLedger;
    }

    @Override
    public Ledger updateLedger(Long ledgerGroupId, Long ledgerId, LedgerPatchDto patchDto) {
        ledgerGroupService.findByGroupId(ledgerGroupId);
        Ledger updatedLedger = findVerifiedLedger(ledgerId);

        updatedLedger.changeTitle(patchDto.getLedgerTitle());
        updatedLedger.changeContent(patchDto.getLedgerContent());
        updatedLedger.changeAmount(patchDto.getLedgerAmount());
        updatedLedger.changeDate(LocalDate.parse(patchDto.getLedgerDate()));

        return updatedLedger;
    }

    @Override
    public Ledger getLedger(Long ledgerGroupId, Long ledgerId) {
        ledgerGroupService.findByGroupId(ledgerGroupId);
        return findVerifiedLedger(ledgerId);
    }

    @Override
    public List<Ledger> getLedgers(Long ledgerGroupId) {
        ledgerGroupService.findByGroupId(ledgerGroupId);
        return ledgerRepository.findAll();
    }

    @Override
    public void deleteLedger(Long ledgerGroupId, Long ledgerId) {
        ledgerGroupService.findByGroupId(ledgerGroupId);
        Ledger deletedLedger = findVerifiedLedger(ledgerId);
        ledgerRepository.delete(deletedLedger);
    }

    @Transactional(readOnly = true)
    public Ledger findById(final Long ledgerId) {
        return ledgerRepository.findById(ledgerId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.LEDGER_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    private Ledger findVerifiedLedger(Long ledgerId) {
        return ledgerRepository.findById(ledgerId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.LEDGER_NOT_FOUND));
    }
}
