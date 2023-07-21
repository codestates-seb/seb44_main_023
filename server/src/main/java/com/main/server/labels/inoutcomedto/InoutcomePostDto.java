package com.main.server.labels.inoutcomedto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.labels.entity.Category;
import com.main.server.labels.entity.Inoutcome;
import com.main.server.member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class InoutcomePostDto {

//    @JsonProperty(value = "member_id")
//    private Long memberId;

    @JsonProperty(value = "in_outcome_name")
    private String inoutcomeName;

    public Inoutcome toEntity(Member member) {
        return new Inoutcome(member, inoutcomeName);
    }
}

