package com.main.server.ledger.repository;

import com.main.server.ledger.entity.Ledger;
import com.main.server.ledgerGroup.entity.LedgerGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface LedgerRepository extends JpaRepository<Ledger, Long> {
    List<Ledger> findByLedgerGroupAndLedgerDateBetween(LedgerGroup ledgerGroup, LocalDate startDate, LocalDate endDate);
}




