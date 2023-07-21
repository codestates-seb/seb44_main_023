package com.main.server.labels.service;

import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.labels.categorydto.CategoryPatchDto;
import com.main.server.labels.categorydto.CategoryPostDto;
import com.main.server.labels.entity.Category;
import com.main.server.labels.entity.Inoutcome;
import com.main.server.labels.inoutcomedto.InoutcomePatchDto;
import com.main.server.labels.inoutcomedto.InoutcomePostDto;
import com.main.server.labels.repository.CategoryRepository;
import com.main.server.labels.repository.InoutcomeRepository;
import com.main.server.member.Member;
import com.main.server.member.MemberService;
import com.main.server.security.JwtTokenizer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class InoutcomeService {
    private final MemberService memberService;
    private final InoutcomeRepository inoutcomeRepository;
    private JwtTokenizer jwtTokenizer;

    public InoutcomeService(MemberService memberService, InoutcomeRepository inoutcomeRepository, JwtTokenizer jwtTokenizer) {
        this.memberService= memberService;
        this.inoutcomeRepository = inoutcomeRepository;
        this.jwtTokenizer = jwtTokenizer;
    }
    public Inoutcome createInoutcome(InoutcomePostDto postDto, String token) {

        // 토큰 검증 및 memberId 식별
        long memberId = jwtTokenizer.getMemberIdFromToken(token);

        // memberId를 사용하여 회원 정보 확인
        Member member = memberService.findMember(memberId);
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        Inoutcome postedInoutcome = inoutcomeRepository.save(postDto.toEntity(member));
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

