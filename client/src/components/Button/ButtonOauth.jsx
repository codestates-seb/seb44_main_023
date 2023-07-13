import React from "react";
import styled from "styled-components";
import googleIcon from "../../assets/icons/google_icon.svg";
import kakaoIcon from "../../assets/icons/kakao_icon.svg";
import naverIcon from "../../assets/icons/naver_icon.svg";

export default function ButtonOauth(props) {
  const { onGoogleClick, onKakaoClick, onNaverClick } = props;

  return (
    <ButtonContainer>
      <GoogleButton onClick={onGoogleClick}>
        <GoogleIcon />
      </GoogleButton>
      <KakaoButton onClick={onKakaoClick}>
        <KakaoIcon />
      </KakaoButton>
      <NaverButton onClick={onNaverClick}>
        <NaverIcon />
      </NaverButton>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GoogleButton = styled.button`
  width: 6.676rem;
  height: 6.676rem;
  border-radius: 50%;
  background-color: white;
  border: none;
  cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  &:hover {
    filter: brightness(90%) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
`;

const KakaoButton = styled.button`
  width: 6.676rem;
  height: 6.676rem;
  border-radius: 50%;
  background-color: #fddc3f;
  border: none;
  cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  &:hover {
    filter: brightness(90%) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
`;

const NaverButton = styled.button`
  width: 6.676rem;
  height: 6.676rem;
  border-radius: 50%;
  background-color: #02bf21;
  border: none;
  cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  &:hover {
    filter: brightness(90%) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
`;

const GoogleIcon = styled.div`
  position: absolute;
  transform: translate(33%, -50%);
  width: 4rem;
  height: 4rem;
  background-image: url(${googleIcon});
  background-repeat: no-repeat;
  background-size: cover;
`;

const KakaoIcon = styled.div`
  position: absolute;
  transform: translate(4%, -53%);
  width: 6.24rem;
  height: 6.24rem;
  background-image: url(${kakaoIcon});
  background-repeat: no-repeat;
  background-size: cover;
`;

const NaverIcon = styled.div`
  position: absolute;
  transform: translate(61%, -50%);
  width: 3.04rem;
  height: 3.04rem;
  background-image: url(${naverIcon});
  background-repeat: no-repeat;
  background-size: cover;
`;
