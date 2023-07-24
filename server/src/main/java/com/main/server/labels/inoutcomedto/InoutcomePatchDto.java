package com.main.server.labels.inoutcomedto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class InoutcomePatchDto {
    @JsonProperty(value = "in_outcome_id")
    private Long inoutcomeId;

    @JsonProperty(value = "in_outcome_name")
    private String inoutcomeName;

    public void setInoutcomeId(Long inoutcomeId) {
        this.inoutcomeId = inoutcomeId;
    }
}
