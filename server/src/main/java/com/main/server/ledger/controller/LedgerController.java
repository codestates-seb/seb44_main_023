package com.main.server.ledger.controller;

import com.main.server.ledger.dto.LedgerPatchDto;
import com.main.server.ledger.dto.LedgerPostDto;
import com.main.server.ledger.dto.LedgerResponseDto;
import com.main.server.ledger.entity.Ledger;
import com.main.server.ledger.service.LedgerService;
import com.main.server.todo.domain.Todo;
import com.main.server.todo.dto.TodoDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/ledgergroups/{ledger-group-id}/ledgers")
public class LedgerController {

    private final LedgerService ledgerService;

    public LedgerController(LedgerService ledgerService) {
        this.ledgerService = ledgerService;
    }
/*
    @PostMapping
    public ResponseEntity createLedger(@PathVariable("ledger-group-id") @Positive Long ledgerGroupId,
                                       @Valid @RequestBody LedgerPostDto postDto) {
        Ledger ledger = ledgerService.createLedger(ledgerGroupId, postDto);

        return new ResponseEntity(new LedgerResponseDto(ledger), HttpStatus.CREATED);
    }
 */

    @PostMapping
    public ResponseEntity<LedgerResponseDto> createLedger(
            @PathVariable("ledger-group-id") @Positive Long ledgerGroupId,
            @Validated @RequestBody LedgerPostDto postDto) {
        Ledger ledger = ledgerService.createLedger(ledgerGroupId, postDto);

        return new ResponseEntity<>(new LedgerResponseDto(ledger), HttpStatus.OK);
    }

    @PatchMapping("/{ledger-id}")
    public ResponseEntity patchLedger(@PathVariable("ledger-group-id") @Positive Long ledgerGroupId,
                                      @PathVariable("ledger-id") @Positive Long ledgerId,
                                      @Valid @RequestBody LedgerPatchDto patchDto) {
        Ledger ledger = ledgerService.updateLedger(ledgerGroupId, ledgerId, patchDto);

        return new ResponseEntity(new LedgerResponseDto(ledger), HttpStatus.OK);
    }

    @GetMapping("/{ledger-id}")
    public ResponseEntity getLedger(@PathVariable("ledger-group-id") @Positive Long ledgerGroupId,
                                    @PathVariable("ledger-id") @Positive Long ledgerId) {
        Ledger ledger = ledgerService.getLedger(ledgerGroupId, ledgerId);
        return new ResponseEntity(new LedgerResponseDto(ledger), HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<LedgerResponseDto>> getLedgers(@PathVariable("ledger-group-id") @Positive Long ledgerGroupId) {
        List<Ledger> ledgers = this.ledgerService.getLedgers(ledgerGroupId);
        List<LedgerResponseDto> responses = ledgers.stream()
                .map((ledger -> new LedgerResponseDto(ledger)))
                .collect(Collectors.toList());

        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @DeleteMapping("/{ledger-id}")
    public ResponseEntity deleteLedger(@PathVariable("ledger-group-id") @Positive Long ledgerGroupId,
                                       @PathVariable("ledger-id") @Positive Long ledgerId) {
        ledgerService.deleteLedger(ledgerGroupId, ledgerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
