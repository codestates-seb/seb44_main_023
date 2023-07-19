package com.main.server.ledger.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.labels.entity.Category;
import com.main.server.ledger.entity.Ledger;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LedgerResponseDto {

    @JsonProperty(value = "member_id")
    private Long memberId;

    @JsonProperty(value = "ledger_id")
    private Long ledgerId;

    @JsonProperty(value = "ledger_group_id")
    private Long ledgerGroupId;

    @JsonProperty(value = "ledger_title")
    private String ledgerTitle;

    @JsonProperty(value = "ledger_content")
    private String ledgerContent;

    @JsonProperty(value = "ledger_amount")
    private Long ledgerAmount;

    @JsonProperty(value = "ledger_schedule_date")
    private String ledgerDate;

    private CategoryDto category;

    public LedgerResponseDto(Ledger ledger, boolean includeCategory) {
        this.memberId = ledger.getMember().getMemberId();
        this.ledgerGroupId = ledger.getLedgerGroup().getLedgerGroupId();
        this.ledgerId = ledger.getLedgerId();
        this.ledgerTitle = ledger.getLedgerTitle();
        this.ledgerContent = ledger.getLedgerContent();
        this.ledgerAmount = ledger.getLedgerAmount();
        this.ledgerDate = String.valueOf(ledger.getLedgerDate());
        if (includeCategory) {
            this.category = new CategoryDto(ledger.getCategory());
            //this.category = new CategoryDto(ledger.getCategory());
        }
    }

        @Getter
        public static class CategoryDto {
            private Long categoryId;
            private String categoryName;

            public CategoryDto(Category category) {
                if (category != null) {
                    this.categoryId = category.getCategoryId();
                    this.categoryName = category.getCategoryName();
                }
            }
        }
    }

