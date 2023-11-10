import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // react-router-dom에서 useNavigate를 import합니다.
import background from "../assets/background.png";
import ErrorCode from "../assets/404page.svg";
import "../index.css";
import useAccessTokenStore from "../store/store.accessToken";
import useUserInfoStore from "../store/store.userInfo";

const ErrorContainer = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Error = styled.div`
  text-align: center;
  color: #fff;
`;

const ErrorCodeImage = styled.img`
  width: 500px;
  padding: 32px;
`;

const Text = styled.div`
  color: black;
  font-size: 24px;
  padding: 32px;
  font-weight: 500;
`;

const Button = styled.button`
  margin: 32px;
  font-size: 20px;
  border-radius: 30px;
  border: none;
  padding: 10px 15px 10px 15px;
  font-weight: 500;
  background-color: #569fbc;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: #42768b;
  }
`;

const ErrorPage = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용합니다.
  const { userInfo } = useUserInfoStore();

  const handleButtonClick = () => {
    if (userInfo.member_id) navigate("/home");
    else navigate("/");
  };

  return (
    <ErrorContainer>
      <Error>
        <ErrorCodeImage src={ErrorCode} alt="Error Code" />
        <Text>
          앗, 여기는 길을 잃은 페이지 같아요. 조금만 기다려주세요, 길을
          찾아갈게요!
        </Text>
        <Button onClick={handleButtonClick}>HOME으로 돌아가기</Button>
      </Error>
    </ErrorContainer>
  );
};

export default ErrorPage;
