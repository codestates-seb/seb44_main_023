import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Input from "../../components/Input/PageInput";

import { MemberListTag } from "./MemberListTag";
import { useGroupEditStore } from "../../store/store.groupEdit";

import GroupDeleteConfirm from "./GroupDeleteConfirm";
import GroupEditSave from "./GroupEditSave";
import { isValidEmail } from "./isValidEmail";
import "./group.css";

const GroupEditFrame = () => {
  const {
    isEditMode,
    groupTitle,
    setInputGroupTitle,
    setIsEditMode,
    addInvitedMember,
  } = useGroupEditStore();

  const [email, setEmail] = useState("");
  const [validation, setValidation] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [inputNewMember, setInputNewMember] = useState("");

  const handleEditTitleClick = () => {
    console.log("setIsEditMode");
    setIsEditMode(true);
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleAddMember(event);
    }
  };
  const handleEmailValidation = (event) => {
    const email = event.target.value;
    let emailValidationMSG = "";
    setValidation(emailValidationMSG); //<=-

    // 이메일 유효성 검사
    if (!email) {
      emailValidationMSG = "이메일을 입력해주세요.";
    } else if (!isValidEmail(email)) {
      emailValidationMSG = "유효한 이메일 형식이 아닙니다.";
    }

    // 유효성 검사 메세지 저장
    setValidation(emailValidationMSG); //<=-
    setEmail(email); //<=-
  };

  const handleAddMember = (event) => {
    const inputMember = event.target.value;

    if (!isValidEmail(inputMember)) {
      event.target.value = "";
      setValidation("유효한 이메일 형식이 아닙니다.");
      return;
    }
    addInvitedMember(inputMember);
    event.target.value = "";
  };

  return (
    <GroupWapper>
      <GroupDivCol>
        <div>
          {/* 그룹명수정기능 */}
          <GroupTitle>현재 그룹명</GroupTitle>
          <EmptyBox style={{ height: "3.3rem" }} />
          <GroupDivRow>
            {isEditMode ? (
              <>
                {/* 수정모드 */}
                <Input
                  width={30.6} // "386px"
                  height={3} // "30px"
                  size={38.6} // "386px"
                  placeHolder={groupTitle} // 추후 설정을 누른 그룹의 이름을 받아오는 로직으로 변경 필요
                  defaultValue=""
                  fontSize={2}
                  minLength={2}
                  maxLength={7}
                  onChange={(e) => setInputGroupTitle(e.target.value)}
                />
                <EditBtn>수정</EditBtn>
              </>
            ) : (
              //디스플레이모드
              <GroupDivRow>
                <GroupName>{groupTitle} </GroupName>
                <EditBtn onClick={handleEditTitleClick}>수정</EditBtn>
              </GroupDivRow>
            )}
          </GroupDivRow>
          <GroupDescription>
            그룹명을 변경 하시려면 수정을 클릭해주세요.{" "}
          </GroupDescription>
          <EmptyBox style={{ height: "3.8rem" }} />

          {/* 친구초대기능  */}
          <GroupTitle>친구 초대</GroupTitle>
          <EmptyBox style={{ height: "1.8rem" }} />
          <Input
            width={38.6} //"300px"//투명박스 px
            height={3} //"30px"//투명박스px
            size={38.6} //"386px" //가로길이 px
            placeHolder="이메일을 입력해주세요"
            defaultValue={inputNewMember}
            fontSize={1.6} //인풋에쓰여지는 텍스트싸이즈
            onChange={handleEmailValidation}
            onKeyUp={handleKeyUp}
            info={validation}
          />
          <EmptyBox style={{ height: "0.6rem" }} />
          <MemberListTag />
        </div>
        <GroupDivRow>
          <GroupDeleteConfirm></GroupDeleteConfirm>
          <GroupEditSave></GroupEditSave>
        </GroupDivRow>
      </GroupDivCol>
    </GroupWapper>
  );
};

const EditBtn = styled.a`
  position: absolute;
  right: 6rem;
  height: 3rem;
  padding: 0.2rem;

  display: flex;
  text-align: center;
  color: var(--color-blue-03);
  font-size: 1.6rem;
  cursor: pointer;
  z-index: 999;
  &:hover {
    color: var(--color-black);
  }
`;

const GroupName = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  width: 38.6rem;
  height: 3rem;
  padding: 0.2rem;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  transition: border-bottom-color 0.3s ease;
  background-color: transparent;
  font-size: 2rem !important;
  border-bottom: 1px solid #ccc;
`;
const GroupInviteList = styled.div`
  display: flex;
  width: 100%;
`;
const EmptyBox = styled.div`
  display: flex;
  width: 100%;
`;
const GroupDescription = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--color-gray-05);
  font-size: 1.3rem;
  justify-self: center;
`;
const GroupTitle = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--color-gray-06);
  font-size: 2rem;
  justify-self: center;
`;

const GroupDivCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 38.6rem;
  height: 85%;
`;
const GroupDivRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const GroupWapper = styled.div`
  display: flex;
  width: 47rem;
  height: 54.4rem;
  justify-content: center;
  background-color: var(--color-gray-02);
  align-items: center;
`;

export default GroupEditFrame;
