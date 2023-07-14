package com.main.server.ledger.controller;

import com.main.server.ledger.entity.Ledger;
import com.main.server.ledger.dto.LedgerPostDto;
import com.main.server.ledger.dto.LedgerPatchDto;
import com.main.server.ledger.dto.LedgerResponseDto;
import com.main.server.ledger.service.LedgerService;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/ledgers")
@Validated
public class LedgerController {

    private final LedgerService ledgerService;

    public LedgerController(LedgerService ledgerService) {
        this.ledgerService = ledgerService;
    }

    @PostMapping
    public ResponseEntity createLedger(@Valid @RequestBody LedgerPostDto postDto) {
        Ledger ledger = ledgerService.createLedger(postDto);

        return new ResponseEntity(new LedgerResponseDto(ledger), HttpStatus.CREATED);
    }

    @PatchMapping("/{ledger-id}")
    public ResponseEntity patchLedger(@PathVariable("ledger-id") @Positive Long ledgerId,
                                      @Valid @RequestBody LedgerPatchDto patchDto) {
        Ledger ledger = ledgerService.updateLedger(ledgerId, patchDto);

        return new ResponseEntity(new LedgerResponseDto(ledger), HttpStatus.OK);
    }

    @GetMapping("/{ledger-id}")
    public ResponseEntity getLedger(@PathVariable("ledger-id") @Positive Long ledgerId) {
        Ledger ledger = ledgerService.getLedger(ledgerId);
        return new ResponseEntity(new LedgerResponseDto(ledger), HttpStatus.OK);
    }

    @DeleteMapping("/{ledger-id}")
    public ResponseEntity deleteLedger(@PathVariable("ledger-id") @Positive Long ledgerId) {
        ledgerService.deleteLedger(ledgerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
