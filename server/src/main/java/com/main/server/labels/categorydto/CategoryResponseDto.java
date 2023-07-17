package com.main.server.labels.categorydto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.labels.entity.Category;
import com.main.server.ledgerGroup.entity.LedgerGroup;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CategoryResponseDto {

    @JsonProperty(value = "member_id")
    private Long memberId;

    @JsonProperty(value = "category_id")
    private Long categoryId;

    @JsonProperty(value = "category_name")
    private String categoryName;

    public CategoryResponseDto(Category category) {
        this.memberId = category.getMember().getMemberId();
        this.categoryId = category.getCategoryId();
        this.categoryName = category.getCategoryName();
    }

}
