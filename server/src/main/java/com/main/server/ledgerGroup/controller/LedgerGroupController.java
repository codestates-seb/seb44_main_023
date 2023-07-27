package com.main.server.ledgerGroup.controller;

import com.main.server.ledgerGroup.dto.LedgerGroupPatchDto;
import com.main.server.ledgerGroup.dto.LedgerGroupPostDto;
import com.main.server.ledgerGroup.dto.LedgerGroupResponseDto;
import com.main.server.ledgerGroup.entity.LedgerGroup;
import com.main.server.ledgerGroup.invitationDto.InvitationLedgerGroupPostDto;
import com.main.server.ledgerGroup.invitationDto.InvitationLedgerGroupResponseDto;
import com.main.server.ledgerGroup.invitationDto.InvitationMemberResponseDto;
import com.main.server.ledgerGroup.service.LedgerGroupService;
import org.springframework.beans.factory.annotation.Value;
import com.main.server.member.Member;
import com.main.server.member.MemberService;
import com.main.server.security.JwtTokenizer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "https://codestates.shop")
@RestController
@Validated
@RequestMapping("/ledgergroups")
public class LedgerGroupController {

    private final LedgerGroupService ledgerGroupService;

    public LedgerGroupController(LedgerGroupService ledgerGroupService) {
        this.ledgerGroupService = ledgerGroupService;
    }

    @PostMapping
    public ResponseEntity createLedgerGroup(@Valid @RequestBody LedgerGroupPostDto ledgerGroupPostDto) {
        LedgerGroup ledgerGroup = ledgerGroupService.createLedgerGroup(ledgerGroupPostDto);

        return new ResponseEntity<>(new LedgerGroupResponseDto(ledgerGroup), HttpStatus.CREATED);
    }

    @PatchMapping("/{ledger-group-id}")
    public ResponseEntity updateLedgerGroup(@PathVariable("ledger-group-id") @Positive Long ledgerGroupId,
                                            @Valid @RequestBody LedgerGroupPatchDto ledgerGroupPatchDto) {
        LedgerGroup ledgerGroup = ledgerGroupService.updateLedgerGroup(ledgerGroupId, ledgerGroupPatchDto);

        return new ResponseEntity(new LedgerGroupResponseDto(ledgerGroup), HttpStatus.OK);
    }

    @GetMapping("/{ledger-group-id}")
    public ResponseEntity getLedgerGroup(@PathVariable("ledger-group-id") @Positive Long ledgerGroupId) {
        LedgerGroup ledgerGroup = ledgerGroupService.getLedgerGroup(ledgerGroupId);
        return new ResponseEntity(new LedgerGroupResponseDto(ledgerGroup), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<LedgerGroupResponseDto>> getLedgerGroups() {
        List<LedgerGroup> ledgerGroups = ledgerGroupService.getLedgerGroups();
        List<LedgerGroupResponseDto> responses = ledgerGroups.stream()
                .map((ledgerGroup -> new LedgerGroupResponseDto(ledgerGroup)))
                .collect(Collectors.toList());

        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @DeleteMapping("/{ledger-group-id}")
    public ResponseEntity deleteLedgerGroup(@PathVariable("ledger-group-id") @Positive Long ledgerGroupId) {
        ledgerGroupService.deleteLedgerGroup(ledgerGroupId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
