package com.main.server.ledgerGroup.invitationDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.main.server.ledgerGroup.entity.LedgerGroup;
import com.main.server.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.File;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class InvitationMemberResponseDto {

    @JsonProperty(value = "ledger_group_id")
    private Long ledgerGroupId;
    @JsonProperty(value = "owner_id")
    private Long ownerId;
    @JsonProperty(value = "profile_image")
    private String profileImage;
    @JsonProperty(value = "invite_members")
    private List<ProfileDto> inviteMembers;

    public InvitationMemberResponseDto(LedgerGroup ledgerGroup, String fileUploadPath) {
        this.ledgerGroupId = ledgerGroup.getLedgerGroupId();
        this.ownerId = ledgerGroup.getMember().getMemberId();
        this.profileImage = String.join(File.separator, fileUploadPath, ledgerGroup.getMember().getProfileImage());

        List<Member> members = ledgerGroup.getLedgerGroupMembers().stream()
                .map((gm) -> gm.getMember())
                .collect(Collectors.toList());

        this.inviteMembers = members.stream()
                .map((m) -> new ProfileDto(m, fileUploadPath))
                .collect(Collectors.toList());
    }


    @Getter
    @NoArgsConstructor
    public static class ProfileDto {
        @JsonProperty(value = "member_id")
        private Long memberId;
        @JsonProperty(value = "profile_image")
        private String profileImage;

        public ProfileDto(Member member, String fileUploadPath) {
            this.memberId = member.getMemberId();
            this.profileImage = String.join(File.separator, fileUploadPath, member.getProfileImage());
        }
    }

}


