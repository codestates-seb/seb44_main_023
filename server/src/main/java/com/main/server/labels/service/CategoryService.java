package com.main.server.labels.service;


import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.labels.categorydto.CategoryPatchDto;
import com.main.server.labels.categorydto.CategoryPostDto;
import com.main.server.labels.entity.Category;
import com.main.server.labels.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class CategoryService {
//    private final MemberService memberService;
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
//        this.memberService= memberService;
        this.categoryRepository = categoryRepository;
    }
    public Category createCategory(CategoryPostDto postDto) {
//        Member member = memberService.findMember(postDto.getMemberId());
        Category postedCategory = categoryRepository.save(postDto.toEntity());
        return postedCategory;
    }
    public Category updateCategory(Long categoryId, CategoryPatchDto patchDto) {
        Category updatedCategory = existingCategory(categoryId);
        updatedCategory.changeName(patchDto.getCategoryName());

        return updatedCategory;
    }
    public Category getCategory(Long categoryId){
        return existingCategory(categoryId);
    }
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }
    public void deleteCategory(Long categoryId) {
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
