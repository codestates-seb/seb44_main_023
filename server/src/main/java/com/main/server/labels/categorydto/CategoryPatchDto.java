package com.main.server.labels.categorydto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CategoryPatchDto {
    @JsonProperty(value = "category_id")
    private Long categoryId;

    @JsonProperty(value = "category_name")
    private String categoryName;

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}
