package com.main.server.ledger.service;

import com.main.server.ledger.dto.LedgerPatchDto;
import com.main.server.ledger.dto.LedgerPostDto;
import com.main.server.ledger.entity.Ledger;

import java.util.List;

public interface LedgerService {

    Ledger createLedger(Long ledgerGroupId, LedgerPostDto postDto);

    Ledger updateLedger(Long ledgerGroupId, Long ledgerId, LedgerPatchDto patchDto);

    Ledger getLedger(Long ledgerGroupId, Long ledgerId);

    List<Ledger> getLedgers(Long ledgerGroupId);

    void deleteLedger(Long ledgerGroupId, Long ledgerId);

}
