package com.main.server.ledger.service;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.ledger.dto.LedgerPatchDto;
import com.main.server.ledger.dto.LedgerPostDto;
import com.main.server.ledger.entity.Ledger;
import com.main.server.ledger.repository.LedgerRepository;
import com.main.server.member.Member;
import com.main.server.member.MemberService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Transactional
@Service
public class LedgerServiceImpl implements LedgerService {

    private final LedgerRepository ledgerRepository;
    private final MemberService memberService;

    public LedgerServiceImpl(LedgerRepository ledgerRepository, MemberService memberService) {
        this.ledgerRepository = ledgerRepository;
        this.memberService = memberService;
    }

    @Override
    public Ledger createLedger(LedgerPostDto postDto) {
        Member member = memberService.findMember(postDto.getMemberId());
        Ledger savedLedger = ledgerRepository.save(postDto.toEntity(member));

        return savedLedger;
    }

    @Override
    public Ledger updateLedger(Long ledgerId, LedgerPatchDto patchDto) {
        Ledger foundLedger = findVerifiedLedger(ledgerId);

        foundLedger.changeTitle(patchDto.getLedgerTitle());
        foundLedger.changeContent(patchDto.getLedgerContent());
        foundLedger.changeAmount(patchDto.getLedgerAmount());
        foundLedger.changeDate(LocalDate.parse(patchDto.getLedgerDate()));

        return foundLedger;
    }

    @Override
    public Ledger getLedger(Long ledgerId) {
        return findVerifiedLedger(ledgerId);
    }

    @Override
    public List<Ledger> getLedgers() {
        return ledgerRepository.findAll();
    }

    @Override
    public void deleteLedger(Long ledgerId) {
        Ledger foundLedger = findVerifiedLedger(ledgerId);
        ledgerRepository.delete(foundLedger);
    }

    @Transactional(readOnly = true)
    private Ledger findVerifiedLedger(Long ledgerId) {
        return ledgerRepository.findById(ledgerId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.LEDGER_NOT_FOUND));
    }
}
