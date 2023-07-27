package com.main.server.labels.categorydto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.labels.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryPostDto {

//    @JsonProperty(value = "member_id")
//    private Long memberId;

    @JsonProperty(value = "category_name")
    private String categoryName;

    public Category toEntity() {
        return new Category(categoryName);
    }
}
