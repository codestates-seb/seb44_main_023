package com.main.server.labels.inoutcomedto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class InoutcomePatchDto {
    @JsonProperty(value = "in_outcome_id")
    private Long inoutcomeId;

    @JsonProperty(value = "in_outcome_name")
    private String inoutcomeName;

    public void setInoutcomeId(Long inoutcomeId) {
        this.inoutcomeId = inoutcomeId;
    }
}
