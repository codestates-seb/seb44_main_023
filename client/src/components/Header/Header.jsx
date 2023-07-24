import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logoSpare.png";
import { MdOutlineLogout } from "react-icons/md";
import useAccessTokenStore from "../../store/store.accessToken";
import { logout } from "../../api/auths.api";
import { useGetUserInfo } from "../../store/store.userInfo";
import WeatherWidget from "../WeatherWidget/HeaderWeatherWidget";

const Header = () => {
  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const popupRef = useRef(null);
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  const { isLoading, memberId, profileImage } = useGetUserInfo();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupVisible(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate(`/profile`);
  };

  const handleLogoutClick = (event) => {
    event.stopPropagation();
    if (isPopupVisible) {
      setPopupVisible(false);
    } else {
      setPopupVisible(true);
    }
  };

  const handleCancel = () => {
    setPopupVisible(false);
  };

  const handleConfirm = async () => {
    try {
      const response = await logout(accessToken);

      if (response.status === 200) {
        setAccessToken(null);
      }
      window.location.href = "/home";
      setPopupVisible(false);
    } catch (error) {
      if (error === 400) {
        alert("실패");
      }
    }
  };

  const handlePopupClick = () => {
    // 팝업 영역 클릭 시 이벤트 전파를 막지 않음
  };

  return (
    <HeaderContainer>
      <LogoWrapper onClick={handleLogoClick}>
        <LogoImage src={Logo} alt="Logo" />
      </LogoWrapper>
      <RightSectionWrapper>
        <Button onClick={handleProfileClick}>
          <UserAvatarImage src={profileImage} alt="User Avatar" />
        </Button>
        <Button onClick={handleLogoutClick}>
          <LogoutIcon size={26} />
        </Button>
      </RightSectionWrapper>
      <WeatherComponent>
        <WeatherWidget />
      </WeatherComponent>
      {isPopupVisible && (
        <PopupWrapper ref={popupRef} onClick={handlePopupClick}>
          <PopupContent>
            <PopupDescription>로그아웃 하시겠습니까?</PopupDescription>
            <ButtonWrapper>
              <CancelButton onClick={handleCancel}>취소</CancelButton>
              <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
            </ButtonWrapper>
          </PopupContent>
        </PopupWrapper>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  width: 100%;
  height: 6rem;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: transparent;
  padding: 1rem 2rem;
`;

const LogoWrapper = styled.div`
  margin-right: 2rem;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 15rem;
`;

const RightSectionWrapper = styled.div`
  margin-left: auto;
`;

const Button = styled.button`
  border: none;
  background: transparent;
  margin-left: 1rem;
`;

const WeatherComponent = styled.div``;

const UserAvatarImage = styled.img`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 100%;
  object-fit: cover;
`;

const LogoutIcon = styled(MdOutlineLogout)`
  width: 2.6rem;
  height: 2.6rem;
`;

const PopupWrapper = styled.div`
  background-color: var(--color-gray-01);
  box-shadow: 0.5rem 0.5rem 1rem 0.2rem rgba(0, 0, 0, 0.25);
  padding: 1.6rem;
  border-radius: 8px;
  z-index: 999;
  position: absolute;
  top: calc(100% + 1rem); /* 버튼과 팝업 꼬리 사이의 간격 조절 */
  right: 1rem;
  transform: translateX(-50%);
  &::before {
    content: "";
    position: absolute;
    top: -2.3rem;
    left: 12rem;
    transform: translateX(-50%);
    border-width: 1.5rem;
    border-style: solid;
    border-color: transparent transparent var(--color-gray-01) transparent;
  }
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PopupDescription = styled.div`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: var(--color-gray-07);
  white-space: nowrap;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const CancelButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.5rem 1.3rem;
  border-radius: 2rem;
  color: var(--color-red-01);
  cursor: pointer;
  border: 1px solid;
  font-size: 1.2rem;
  &:hover {
    background-color: var(--color-gray-03);
  }
`;

const ConfirmButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.5rem 1.3rem;
  border-radius: 2rem;
  color: var(--color-blue-03);
  cursor: pointer;
  border: 1px solid;
  font-size: 1.2rem;
  &:hover {
    background-color: var(--color-gray-03);
  }
`;

export default Header;
