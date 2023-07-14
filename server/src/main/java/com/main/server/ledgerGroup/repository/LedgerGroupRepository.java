package com.main.server.ledgerGroup.repository;

import com.main.server.ledgerGroup.entity.LedgerGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LedgerGroupRepository extends JpaRepository<LedgerGroup, Long> {
}
