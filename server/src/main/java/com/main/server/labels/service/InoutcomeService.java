package com.main.server.labels.service;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.labels.entity.Inoutcome;
import com.main.server.labels.inoutcomedto.InoutcomePatchDto;
import com.main.server.labels.inoutcomedto.InoutcomePostDto;
import com.main.server.labels.repository.InoutcomeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class InoutcomeService {
//    private final MemberService memberService;
    private final InoutcomeRepository inoutcomeRepository;

    public InoutcomeService(InoutcomeRepository inoutcomeRepository) {
//        this.memberService= memberService;
        this.inoutcomeRepository = inoutcomeRepository;
    }
    public Inoutcome createInoutcome(InoutcomePostDto postDto) {
//        Member member = memberService.findMember(postDto.getMemberId());
        Inoutcome postedInoutcome = inoutcomeRepository.save(postDto.toEntity());
        return postedInoutcome;
    }
    public Inoutcome updateInoutcome(Long inoutcomeId, InoutcomePatchDto patchDto) {
        Inoutcome updatedInoutcome = existingInoutcome(inoutcomeId);
        updatedInoutcome.changeName(patchDto.getInoutcomeName());

        return updatedInoutcome;
    }
    public Inoutcome getInoutcome(Long inoutcomeId){
        return existingInoutcome(inoutcomeId);
    }
    public List<Inoutcome> getInoutcomes() {
        return inoutcomeRepository.findAll();
    }

    public void deleteInoutcome(Long inoutcomeId) {
        Inoutcome deletedInoutcome = existingInoutcome(inoutcomeId);
        inoutcomeRepository.delete(deletedInoutcome);
    }

    @Transactional
    public Inoutcome findByInoutcomeId(final Long inoutcomeId) {
        return inoutcomeRepository.findById(inoutcomeId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.INOUTCOME_NOT_FOUND));
    }

    @Transactional(readOnly = true )
    public Inoutcome existingInoutcome(Long inoutcomeId) {
        Inoutcome existingInoutcome = inoutcomeRepository.findById(inoutcomeId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.INOUTCOME_NOT_FOUND));
        return existingInoutcome;
    }

}

