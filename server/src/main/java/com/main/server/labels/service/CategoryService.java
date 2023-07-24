package com.main.server.labels.service;


import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.labels.categorydto.CategoryPostDto;
import com.main.server.labels.categorydto.CategoryPatchDto;
import com.main.server.labels.entity.Category;
import com.main.server.labels.repository.CategoryRepository;
import com.main.server.ledgerGroup.entity.LedgerGroup;
import com.main.server.member.Member;
import com.main.server.member.MemberService;

import com.main.server.security.JwtTokenizer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Transactional
@Service
public class CategoryService {
    private final MemberService memberService;
    private final CategoryRepository categoryRepository;
    private JwtTokenizer jwtTokenizer;

    public CategoryService(MemberService memberService, CategoryRepository categoryRepository, JwtTokenizer jwtTokenizer) {
        this.memberService= memberService;
        this.categoryRepository = categoryRepository;
        this.jwtTokenizer = jwtTokenizer;
    }
    public Category createCategory(CategoryPostDto postDto, String token) {

        // 토큰 검증 및 memberId 식별
        long memberId = jwtTokenizer.getMemberIdFromToken(token);

        // memberId를 사용하여 회원 정보 확인
        Member member = memberService.findMember(memberId);
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        Category postedCategory = categoryRepository.save(postDto.toEntity(member));
        return postedCategory;
    }
    public Category updateCategory(Long categoryId, CategoryPatchDto patchDto, String token) {
        Category updatedCategory = existingCategory(categoryId);
        updatedCategory.changeName(patchDto.getCategoryName());

        return updatedCategory;
    }
    public Category getCategory(Long categoryId, String token){
        return existingCategory(categoryId);
    }
    public List<Category> getCategories(String token) {
        return categoryRepository.findAll();
    }
    public void deleteCategory(Long categoryId, String token) {
        Category deletedCategory = existingCategory(categoryId);
        categoryRepository.delete(deletedCategory);
    }

    @Transactional
    public Category findByCategoryId(final Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND));
    }

    @Transactional(readOnly = true )
    public Category existingCategory(Long categoryId) {
         Category existingCategory = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND));
        return existingCategory;
    }

}
