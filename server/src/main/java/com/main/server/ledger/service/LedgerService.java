package com.main.server.ledger.service;

import com.main.server.ledger.entity.Ledger;
import com.main.server.ledger.dto.LedgerPatchDto;
import com.main.server.ledger.dto.LedgerPostDto;

import java.util.List;

public interface LedgerService {

    Ledger createLedger(LedgerPostDto postDto);

    Ledger updateLedger(Long ledgerId, LedgerPatchDto patchDto);

    Ledger getLedger(Long ledgerId);

    List<Ledger> getLedgers();

    void deleteLedger(Long ledgerId);

}
