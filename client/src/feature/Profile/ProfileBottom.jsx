import { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input/PageInput";
import Toggle from "../../components/Toggle/Toggle";
import kakaoIcon from "../../assets/icons/kakao_icon.svg";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useStoreHide } from "../../store/store.hide";
import Button from "../../components/Button/Button";
import { deleteMember, updatePassword } from "../../api/members.api";
import Popconfirm from "../../components/Popconfirm/Popconfirm";
import { useNavigate } from "react-router-dom";
import ProfileGroupSetting from "./ProfileGroupSetting";

const ProfileBottom = ({ profileInfo }) => {
  const { memberId, email, social } = profileInfo;

  const { isHidden, changeVisibility } = useStoreHide();
  const [isEditMode, setIsEditMode] = useState(false);
  const [passwordInput, setPasswordInput] = useState();
  const [newPasswordInput, setNewPasswordInput] = useState();
  const [passwordConfirmInput, setPasswordConfirmInput] = useState();

  const navigate = useNavigate();

  const handleEditMode = () => setIsEditMode(!isEditMode);

  const handleChangePassword = async () => {
    try {
      await updatePassword(memberId, passwordInput, newPasswordInput);
      handleEditMode();
      setPasswordInput();
      setNewPasswordInput();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteMember = async () => {
    try {
      await deleteMember(memberId, passwordConfirmInput);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledWrapper>
      <Title>비밀번호</Title>
      <PasswordWrap>
        {isEditMode ? (
          <div className="password-input-wrap">
            <Input
              type="password"
              placeholder="기존 비밀번호"
              value={passwordInput}
              onChange={(event) => setPasswordInput(event.target.value)}
            />
            <Input
              type="password"
              placeholder="새 비밀번호"
              value={newPasswordInput}
              onChange={(event) => setNewPasswordInput(event.target.value)}
            />
          </div>
        ) : (
          <div />
        )}
        {isEditMode ? (
          <div className="password-button-wrap">
            <TextButton
              onClick={() => {
                handleEditMode();
                setPasswordInput();
                setNewPasswordInput();
              }}
              color="var(--color-red-01)"
            >
              취소
            </TextButton>
            <TextButton
              onClick={handleChangePassword}
              color="var(--color-blue-03)"
            >
              저장
            </TextButton>
          </div>
        ) : (
          <TextButton onClick={handleEditMode} color="var(--color-gray-04)">
            비밀번호 변경
          </TextButton>
        )}
      </PasswordWrap>
      {social && (
        <>
          <Title>소셜 정보</Title>
          <Content>
            <SocialIcon src={kakaoIcon} />
            카카오톡
          </Content>
        </>
      )}
      <Title>이메일 주소</Title>
      <Content>{email}</Content>
      <Title>메인 페이지 설정</Title>
      <ProfileGroupSetting />

      <Title>숨기기 설정</Title>
      <Toggle checked={isHidden} onClick={changeVisibility} />
      <Title>회원 탈퇴</Title>
      <Content>
        <Popconfirm
          title="정말 탈퇴하시겠습니까?"
          description={
            <Input
              placeholder="현재 비밀번호"
              type="password"
              value={passwordConfirmInput}
              onChange={(event) => setPasswordConfirmInput(event.target.value)}
            />
          }
          cancelText="취소"
          confirmText="탈퇴하기"
          onConfirm={handleDeleteMember}
        >
          <Button label="회원 탈퇴" size="medium" />
        </Popconfirm>
      </Content>
    </StyledWrapper>
  );
};

export default ProfileBottom;

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 80rem;
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 8rem;
  row-gap: 5.2rem;
  font-size: 2rem;
  align-items: center;
`;

const Title = styled.div`
  font-weight: bold;
  min-height: 3.6rem;
  display: flex;
  align-items: center;
  align-self: flex-start;
`;

const Content = styled.div`
  min-height: 3.6rem;
  display: flex;
  align-items: center;
`;

const SocialIcon = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  margin-right: 1.6rem;
`;

const PasswordWrap = styled.div`
  min-height: 3.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  .password-input-wrap {
    display: flex;
    flex-direction: column;
  }

  .password-button-wrap {
    display: flex;
    gap: 1.6rem;
  }
`;

const TextButton = styled.button`
  width: max-content;
  font-size: 2rem;
  color: ${({ color }) => color};
  background: none;
`;
