import { useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input/PageInput";
import Toggle from "../../components/Toggle/Toggle";
import kakaoIcon from "../../assets/icons/kakao_icon.svg";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useStoreHide } from "../../store/store.hide";
import Button from "../../components/Button/Button";

const ProfileBottom = () => {
  const { isHidden, changeVisibility } = useStoreHide();
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditMode = () => setIsEditMode(!isEditMode);

  return (
    <StyledWrapper>
      <Title>비밀번호</Title>
      <PasswordWrap>
        {isEditMode ? <Input type="password" /> : <div />}
        {isEditMode ? (
          <div className="password-button-wrap">
            <TextButton onClick={handleEditMode} color="var(--color-red-01)">
              취소
            </TextButton>
            <TextButton onClick={handleEditMode} color="var(--color-blue-03)">
              저장
            </TextButton>
          </div>
        ) : (
          <TextButton onClick={handleEditMode} color="var(--color-gray-04)">
            비밀번호 변경
          </TextButton>
        )}
      </PasswordWrap>
      <Title>소셜 정보</Title>
      <Content>
        <SocialIcon src={kakaoIcon} />
        카카오톡
      </Content>
      <Title>이메일 주소</Title>
      <Content>test@naver.com</Content>
      <Title>메인 페이지 설정</Title>
      <PageSetting>
        <div className="setting-box">
          <div className="setting-box-title">TODO</div>
          <Dropdown
            id="todo-group"
            menu={[
              {
                label: "GROUP 1",
                key: "8498723981",
              },
              {
                label: "GROUP2",
                key: "3123782468",
              },
            ]}
          />
        </div>
        <div className="setting-box">
          <div className="setting-box-title">가계부</div>
          <Dropdown
            id="account-group"
            menu={[
              {
                label: "GROUP 1",
                key: "8498723981",
              },
              {
                label: "GROUP2",
                key: "3123782468",
              },
            ]}
          />
        </div>
      </PageSetting>
      <Title>숨기기 설정</Title>
      <Toggle checked={isHidden} onClick={changeVisibility} />
      <Title>회원 탈퇴</Title>
      <Content>
        <Button label="회원 탈퇴" size="medium" />
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

const PageSetting = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .setting-box {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .setting-box-title {
      margin-right: 4rem;
    }
  }
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
