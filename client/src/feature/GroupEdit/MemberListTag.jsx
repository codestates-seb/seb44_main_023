import { useState } from "react";
import styled from "styled-components";
import { useGroupEditStore } from "../../store/store.groupEdit";

export const MemberListTag = () => {
  const { invitedMembers, removeInvitedMember } = useGroupEditStore();

  const handleRemoveMember = (indexToRemove) => {
    removeInvitedMember(indexToRemove);

    console.log("here!");
  };

  return (
    <>
      <InviteWrapper>
        <InviteUl id="members">
          {invitedMembers.map((member, index) => (
            <InviteLi key={index} className={index % 2 === 0 ? "even" : "odd"}>
              <InviteMember className="invite-mail">
                <div>{member}</div>
                <div
                  className="invite-close-icon"
                  onClick={() => handleRemoveMember(index)}
                >
                  &times;
                </div>
              </InviteMember>
            </InviteLi>
          ))}
        </InviteUl>
      </InviteWrapper>
    </>
  );
};
export const InviteMember = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4.2rem;
  margin: 0 1.7rem 0.5rem;
  font-size: 1.6rem;
  margin-left: 1rem;
  line-height: 1.9rem;
  letter-spacing: 0em;
  color: var(--color-gray-09);
`;
export const InviteLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid var(--color-gray-04);
  &.odd {
    background-color: white;
  }
  &.even {
    background-color: var(--color-gray-03);
  }
`;
export const InviteUl = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
export const InviteWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 19rem;
  overflow-y: scroll;
`;
