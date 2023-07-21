package com.main.server.ledger.service;

import com.main.server.ledger.dto.LedgerPatchDto;
import com.main.server.ledger.dto.LedgerPostDto;
import com.main.server.ledger.entity.Ledger;

import java.time.LocalDate;
import java.util.List;

public interface LedgerService {

    Ledger createLedger(Long ledgerGroupId, LedgerPostDto postDto, String token);

    Ledger updateLedger(Long ledgerGroupId, Long ledgerId, LedgerPatchDto patchDto);

    Ledger getLedger(Long ledgerGroupId, Long ledgerId);

    List<Ledger> getLedgers(Long ledgerGroupId);

    List<Ledger> getLedgersByDate(Long ledgerGroupId, LocalDate startDate, LocalDate endDate);

    void deleteLedger(Long ledgerGroupId, Long ledgerId);

}
