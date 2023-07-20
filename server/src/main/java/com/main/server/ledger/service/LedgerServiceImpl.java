package com.main.server.ledger.service;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.labels.entity.Category;
import com.main.server.labels.entity.Inoutcome;
import com.main.server.labels.entity.Payment;
import com.main.server.labels.repository.CategoryRepository;
import com.main.server.labels.repository.InoutcomeRepository;
import com.main.server.labels.repository.PaymentRepository;
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
import java.util.Comparator;
import java.util.List;

@Transactional
@Service
public class LedgerServiceImpl implements LedgerService {

    private final LedgerRepository ledgerRepository;
    private final MemberService memberService;
    private final LedgerGroupService ledgerGroupService;
    private final CategoryRepository categoryRepository;
    private final InoutcomeRepository inoutcomeRepository;
    private final PaymentRepository paymentRepository;

    public LedgerServiceImpl(LedgerRepository ledgerRepository, MemberService memberService, LedgerGroupService ledgerGroupService,
                             CategoryRepository categoryRepository, InoutcomeRepository inoutcomeRepository, PaymentRepository paymentRepository) {
        this.ledgerRepository = ledgerRepository;
        this.memberService = memberService;
        this.ledgerGroupService = ledgerGroupService;
        this.categoryRepository = categoryRepository;
        this.inoutcomeRepository = inoutcomeRepository;
        this.paymentRepository = paymentRepository;
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
        Inoutcome inoutcome = null;
        Long inoutcomeId = postDto.getInoutcomeId();
        if (inoutcomeId != null) {
            inoutcome = inoutcomeRepository.findById(inoutcomeId)
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.INOUTCOME_NOT_FOUND));
        }

        Payment payment = null;
        Long paymentId = postDto.getPaymentId();
        if (paymentId != null) {
            payment = paymentRepository.findById(paymentId)
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PAYMENT_NOT_FOUND));
        }

        Ledger ledger;
        if (category != null) {
            if (inoutcome != null) {
                if (payment != null) {
                    ledger = postDto.toEntity(member, ledgerGroup, category, inoutcome, payment); // aaa
                } else {
                    ledger = postDto.toEntity(member, ledgerGroup, category, inoutcome, null); // aab
                }
            } else {
                if (payment != null) {
                    ledger = postDto.toEntity(member, ledgerGroup, category, null, payment); // aba
                } else {
                    ledger = postDto.toEntity(member, ledgerGroup, category, null, null); // abb
                }
            }
        } else {
            if (inoutcome != null) {
                if (payment != null) {
                    ledger = postDto.toEntity(member, ledgerGroup, null, inoutcome, payment); // baa
                } else {
                    ledger = postDto.toEntity(member, ledgerGroup, null, inoutcome, null); // bab
                }
            } else {
                if (payment != null) {
                    ledger = postDto.toEntity(member, ledgerGroup, null, null, payment); // bba
                } else {
                    ledger = postDto.toEntity(member, ledgerGroup, null, null, null); // bbb
                }
            }
        }

        Ledger savedLedger = ledgerRepository.save(ledger);

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
            Long inoutcomeId = patchDto.getInoutcomeId();
            if (inoutcomeId != null) {
                Inoutcome inoutcome = inoutcomeRepository.findById(inoutcomeId).orElse(null);
                if (inoutcome == null) {// 카테고리 ID가 유효하지 않은 경우
                    throw new BusinessLogicException(ExceptionCode.INOUTCOME_NOT_FOUND);
                }
                updatedLedger.changeInoutcome(inoutcome);  // 카테고리 연결 업데이트
            } else {
                if (updatedLedger.getInoutcome() != null) {// 카테고리 ID가 null인 경우 카테고리 연결을 유지하거나 제거
                    updatedLedger.changeInoutcome(null);
                }
            }
            Long paymentId = patchDto.getPaymentId();
            if (paymentId != null) {
                Payment payment = paymentRepository.findById(paymentId).orElse(null);
                if (payment == null) {// 카테고리 ID가 유효하지 않은 경우
                    throw new BusinessLogicException(ExceptionCode.PAYMENT_NOT_FOUND);
                }
                updatedLedger.changePayment(payment);  // 카테고리 연결 업데이트
            } else {
                if (updatedLedger.getPayment() != null) {// 카테고리 ID가 null인 경우 카테고리 연결을 유지하거나 제거
                    updatedLedger.changePayment(null);
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
    public List<Ledger> getLedgersByDate(Long ledgerGroupId, LocalDate startDate, LocalDate endDate) {
        LedgerGroup ledgerGroup = ledgerGroupService.findByGroupId(ledgerGroupId);

        List<Ledger> ledgers = this.ledgerRepository.findByLedgerGroupAndLedgerDateBetween(ledgerGroup ,startDate, endDate);
        ledgers.sort(Comparator.comparing(Ledger::getLedgerDate));

        return ledgers;

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
