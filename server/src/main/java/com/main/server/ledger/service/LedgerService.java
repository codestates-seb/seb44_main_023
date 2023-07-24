package com.main.server.ledger.service;

import com.main.server.ledger.dto.LedgerPatchDto;
import com.main.server.ledger.dto.LedgerPostDto;
import com.main.server.ledger.entity.Ledger;

import java.time.LocalDate;
import java.util.List;

public interface LedgerService {

    Ledger createLedger(Long ledgerGroupId, LedgerPostDto postDto, String token);

    Ledger updateLedger(Long ledgerGroupId, Long ledgerId, LedgerPatchDto patchDto, String token);

    Ledger getLedger(Long ledgerGroupId, Long ledgerId, String token);

    List<Ledger> getLedgers(Long ledgerGroupId, String token);

    List<Ledger> getLedgersByDate(Long ledgerGroupId, LocalDate startDate, LocalDate endDate, String token);

    void deleteLedger(Long ledgerGroupId, Long ledgerId, String token);

}
