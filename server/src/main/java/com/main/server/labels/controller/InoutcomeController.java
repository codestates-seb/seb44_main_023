package com.main.server.labels.controller;

import com.main.server.labels.entity.Inoutcome;
import com.main.server.labels.inoutcomedto.InoutcomePatchDto;
import com.main.server.labels.inoutcomedto.InoutcomePostDto;
import com.main.server.labels.inoutcomedto.InoutcomeResponseDto;
import com.main.server.labels.service.InoutcomeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/inoutcomes")
public class InoutcomeController {

    private final InoutcomeService inoutcomeService;

    public InoutcomeController(InoutcomeService inoutcomeService) {
        this.inoutcomeService = inoutcomeService;
    }

    @PostMapping
    public ResponseEntity<InoutcomeResponseDto> createInoutcome(
            @Valid @RequestBody InoutcomePostDto inoutcomePostDto) {
        Inoutcome createdInoutcome = inoutcomeService.createInoutcome(inoutcomePostDto);
        InoutcomeResponseDto responseDto = new InoutcomeResponseDto(createdInoutcome);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @PatchMapping("/{in_outcome-id}")
    public ResponseEntity<InoutcomeResponseDto> updateInoutcome(
            @PathVariable("in_outcome-id") @Positive Long inoutcomeId,
            @Validated @RequestBody InoutcomePatchDto inoutcomePatchDto) {
        Inoutcome updatedInoutcome = inoutcomeService.updateInoutcome(inoutcomeId, inoutcomePatchDto);
        InoutcomeResponseDto responseDto = new InoutcomeResponseDto(updatedInoutcome);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/{in_outcome-id}")
    public ResponseEntity<InoutcomeResponseDto> getInoutcome(
            @PathVariable("in-outcome-id") @Positive Long inoutcomeId) {
        Inoutcome inoutcome = inoutcomeService.getInoutcome(inoutcomeId);
        InoutcomeResponseDto responseDto = new InoutcomeResponseDto(inoutcome);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<InoutcomeResponseDto>> getInoutcomes() {
        List<Inoutcome> inoutcomes = inoutcomeService.getInoutcomes();
        List<InoutcomeResponseDto> responseDtoList = inoutcomes.stream()
                .map(InoutcomeResponseDto::new)
                .collect(Collectors.toList());
        return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
    }

    @DeleteMapping("/{in_outcome-id}")
    public ResponseEntity<Void> deleteInoutcome(
            @PathVariable("in-outcome-id") @Positive Long inoutcomeId) {
        inoutcomeService.deleteInoutcome(inoutcomeId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
