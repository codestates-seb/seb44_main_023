import React from "react";
import styled from "styled-components";
import googleIcon from "../../assets/icons/google_icon.svg";
import kakaoIcon from "../../assets/icons/kakao_icon.svg";
import naverIcon from "../../assets/icons/naver_icon.svg";

export default function ButtonOauth(props) {
  const { google, kakao, naver, onClick} = props;

  return (
    <ButtonContainer onClick={onClick}>
      {google && (
        <GoogleButton>
          <GoogleIcon />
        </GoogleButton>
      )}
      {kakao && (
        <KakaoButton>
          <KakaoIcon />
        </KakaoButton>
      )}
      {naver && (
        <NaverButton>
          <NaverIcon/>
        </NaverButton>
      )}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const GoogleButton = styled.button`
  width: 4.1725rem;
  height: 4.1725rem;
  border-radius: 50%;
  background-color: white;
  border: none;
  cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const KakaoButton = styled.button`
  width: 4.1725rem;
  height: 4.1725rem;
  border-radius: 50%;
  background-color: #FDDC3F;
  border: none;
  cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const NaverButton = styled.button`
  width: 4.1725rem;
  height: 4.1725rem;
  border-radius: 50%;
  background-color: #06BE34;
  border: none;
  cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const GoogleIcon = styled.div`
  position: absolute;
  transform: translate(20%, -50%);
  width: 2.5rem;
  height: 2.5rem;
  background-image: url(${googleIcon});
  background-repeat: no-repeat;
  background-size: cover;
`;

const KakaoIcon = styled.div`
  position: absolute;
  transform: translate(-5%, -53%);
  width: 3.9rem;
  height: 3.9rem;
  background-image: url(${kakaoIcon});
  background-repeat: no-repeat;
  background-size: cover;
`;

const NaverIcon = styled.div`
  position: absolute;
  transform: translate(40%, -50%);
  width: 1.9rem;
  height: 1.9rem;
  background-image: url(${naverIcon});
  background-repeat: no-repeat;
  background-size: cover;
`;