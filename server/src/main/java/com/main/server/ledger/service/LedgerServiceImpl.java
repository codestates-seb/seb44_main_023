package com.main.server.ledger.service;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.labels.entity.Category;
import com.main.server.labels.repository.CategoryRepository;
import com.main.server.ledger.dto.LedgerPatchDto;
import com.main.server.ledger.dto.LedgerPostDto;
import com.main.server.ledger.entity.Ledger;
import com.main.server.ledger.repository.LedgerRepository;
import com.main.server.ledgerGroup.controller.LedgerGroupController;
import com.main.server.ledgerGroup.entity.LedgerGroup;
import com.main.server.ledgerGroup.service.LedgerGroupService;
import com.main.server.member.Member;
import com.main.server.member.MemberService;
import com.main.server.todo.domain.Todo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@Transactional
@Service
public class LedgerServiceImpl implements LedgerService {

    private final LedgerRepository ledgerRepository;
    private final MemberService memberService;
    private final LedgerGroupService ledgerGroupService;
    private final CategoryRepository categoryRepository;

    public LedgerServiceImpl(LedgerRepository ledgerRepository, MemberService memberService,
                             LedgerGroupService ledgerGroupService, CategoryRepository categoryRepository) {
        this.ledgerRepository = ledgerRepository;
        this.memberService = memberService;
        this.ledgerGroupService = ledgerGroupService;
        this.categoryRepository = categoryRepository;
    }

        @Override
        public Ledger createLedger(Long ledgerGroupId, LedgerPostDto postDto) {
            Member member = memberService.findMember(postDto.getMemberId());
            LedgerGroup ledgerGroup = ledgerGroupService.findByGroupId(ledgerGroupId);
            Category category = null;  // 카테고리 초기값 설정
            Long categoryId = postDto.getCategoryId();
            if (categoryId != null) {  // 요청 바디로 받은 카테고리 ID가 null이 아닌 경우에만 카테고리 조회
                category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND));
        }
            Ledger savedLedger = ledgerRepository.save(postDto.toEntity(member, ledgerGroup, category));

            return savedLedger;
        }

        @Override
        public Ledger updateLedger (Long ledgerGroupId, Long ledgerId, LedgerPatchDto patchDto){
            LedgerGroup ledgerGroup = ledgerGroupService.findByGroupId(ledgerGroupId);
            Ledger updatedLedger = findVerifiedLedger(ledgerId);
            Long categoryId = patchDto.getCategoryId();
            if (categoryId != null) {
                Category category = categoryRepository.findById(categoryId).orElse(null);
                if (category == null) {// 카테고리 ID가 유효하지 않은 경우
                    throw new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND);
                }
                updatedLedger.changeCategory(category);  // 카테고리 연결 업데이트
            } else {
                if (updatedLedger.getCategory() != null) {// 카테고리 ID가 null인 경우 카테고리 연결을 유지하거나 제거
                    updatedLedger.changeCategory(null);
                }
            }
            updatedLedger.changeTitle(patchDto.getLedgerTitle());
            updatedLedger.changeContent(patchDto.getLedgerContent());
            updatedLedger.changeAmount(patchDto.getLedgerAmount());
            updatedLedger.changeDate(LocalDate.parse(patchDto.getLedgerDate()));
            updatedLedger.changeLedgerGroup(ledgerGroup); // 그룹 아이디 변경

            return updatedLedger;
        }


        @Override
        public Ledger getLedger (Long ledgerGroupId, Long ledgerId){
            ledgerGroupService.findByGroupId(ledgerGroupId);
            return findVerifiedLedger(ledgerId);
        }

        @Override
        public List<Ledger> getLedgers (Long ledgerGroupId){
            LedgerGroup ledgerGroup = ledgerGroupService.findByGroupId(ledgerGroupId);
            if (ledgerGroup == null) {
                // 그룹이 존재하지 않을 경우
                return Collections.emptyList();
            }
            return ledgerGroup.getLedgers();
        }

        @Override
        public void deleteLedger (Long ledgerGroupId, Long ledgerId){
            ledgerGroupService.findByGroupId(ledgerGroupId);
            Ledger deletedLedger = findVerifiedLedger(ledgerId);
            ledgerRepository.delete(deletedLedger);
        }

        @Transactional(readOnly = true)
        public Ledger findById ( final Long ledgerId){
            return ledgerRepository.findById(ledgerId)
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.LEDGER_NOT_FOUND));
        }

        @Transactional(readOnly = true)
        private Ledger findVerifiedLedger (Long ledgerId){
            return ledgerRepository.findById(ledgerId)
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.LEDGER_NOT_FOUND));
        }
    }
