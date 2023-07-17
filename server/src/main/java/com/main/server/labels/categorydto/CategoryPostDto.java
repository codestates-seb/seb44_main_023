package com.main.server.labels.categorydto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.labels.entity.Category;
import com.main.server.member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CategoryPostDto {

    @JsonProperty(value = "member_id")
    private Long memberId;

    @JsonProperty(value = "category_name")
    private String categoryName;

    public Category toEntity(Member member) {
        return new Category(member, categoryName);
    }
}
