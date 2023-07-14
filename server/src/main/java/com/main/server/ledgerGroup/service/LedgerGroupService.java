package com.main.server.ledgerGroup.service;

import com.main.server.ledgerGroup.dto.LedgerGroupPatchDto;
import com.main.server.ledgerGroup.dto.LedgerGroupPostDto;
import com.main.server.ledgerGroup.entity.LedgerGroup;

import java.util.List;

public interface LedgerGroupService {
    LedgerGroup createLedgerGroup(LedgerGroupPostDto postDto);
    LedgerGroup updateLedgerGroup(Long ledgerGroupId, LedgerGroupPatchDto patchDto);
    LedgerGroup getLedgerGroup(Long ledgerGroupId);
    List<LedgerGroup> getLedgerGroups();
    void deleteLedgerGroup(Long ledgerGroupId);

    LedgerGroup findByGroupId(Long ledgerGroupId);
}
