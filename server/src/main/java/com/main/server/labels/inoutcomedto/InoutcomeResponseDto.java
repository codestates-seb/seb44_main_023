package com.main.server.labels.inoutcomedto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.labels.entity.Category;
import com.main.server.labels.entity.Inoutcome;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class InoutcomeResponseDto {

    @JsonProperty(value = "member_id")
    private Long memberId;

    @JsonProperty(value = "in_outcome_id")
    private Long inoutcomeId;

    @JsonProperty(value = "in_outcome_name")
    private String inoutcomeName;

    public InoutcomeResponseDto(Inoutcome inoutcome) {
        this.memberId = inoutcome.getMember().getMemberId();
        this.inoutcomeId = inoutcome.getInoutcomeId();
        this.inoutcomeName = inoutcome.getInoutcomeName();
    }


}
