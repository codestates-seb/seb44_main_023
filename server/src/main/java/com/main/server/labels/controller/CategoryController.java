package com.main.server.labels.controller;

import com.main.server.labels.categorydto.CategoryPatchDto;
import com.main.server.labels.categorydto.CategoryPostDto;
import com.main.server.labels.categorydto.CategoryResponseDto;
import com.main.server.labels.entity.Category;
import com.main.server.labels.service.CategoryService;
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
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<CategoryResponseDto> createCategory(
            @Valid @RequestBody CategoryPostDto categoryPostDto) {
        Category createdCategory = categoryService.createCategory(categoryPostDto);
        CategoryResponseDto responseDto = new CategoryResponseDto(createdCategory);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @PatchMapping("/{category-id}")
    public ResponseEntity<CategoryResponseDto> updateCategory(
            @PathVariable("category-id") @Positive Long categoryId,
            @Validated @RequestBody CategoryPatchDto categoryPatchDto) {
        Category updatedCategory = categoryService.updateCategory(categoryId, categoryPatchDto);
        CategoryResponseDto responseDto = new CategoryResponseDto(updatedCategory);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/{category-id}")
    public ResponseEntity<CategoryResponseDto> getCategory(
            @PathVariable("category-id") @Positive Long categoryId) {
        Category category = categoryService.getCategory(categoryId);
        CategoryResponseDto responseDto = new CategoryResponseDto(category);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponseDto>> getCategories() {
        List<Category> categories = categoryService.getCategories();
        List<CategoryResponseDto> responseDtoList = categories.stream()
                .map(CategoryResponseDto::new)
                .collect(Collectors.toList());
        return new ResponseEntity<>(responseDtoList, HttpStatus.OK);
    }

    @DeleteMapping("/{category-id}")
    public ResponseEntity<Void> deleteCategory(
            @PathVariable("category-id") @Positive Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
