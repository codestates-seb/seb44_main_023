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
@Validated
@RequestMapping("/ledgergroups")
public class LedgerGroupController {

    @Value("${file.upload.path}")
    private String fileUploadPath;

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

    @PostMapping("/{ledger-group-id}/invitation")
    public ResponseEntity invite(@PathVariable("ledger-group-id") @Positive Long ledgerGroupId,
                                 @Valid @RequestBody InvitationLedgerGroupPostDto invitationLedgerGroupPostDto) {
        LedgerGroup ledgerGroup = ledgerGroupService.invite(ledgerGroupId, invitationLedgerGroupPostDto);
        return new ResponseEntity<>(new InvitationLedgerGroupResponseDto(ledgerGroup), HttpStatus.CREATED);
    }

    @GetMapping("/{ledger-group-id}/members")
    public ResponseEntity inviteMember(@PathVariable("ledger-group-id") @Positive Long ledgerGroupId) {
        LedgerGroup ledgerGroup = ledgerGroupService.getInvitedMember(ledgerGroupId);
        return new ResponseEntity(new InvitationMemberResponseDto(ledgerGroup, fileUploadPath), HttpStatus.OK);
    }
}
