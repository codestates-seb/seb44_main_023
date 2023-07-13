import Signup from "../feature/Signup/Signup";
import SignupHeader from "../feature/Signup/SignupHeader";
import background from "../assets/background.png";
import styled from "styled-components";
import OauthSignup from "../feature/Signup/OauthSignup";

const SignupPage = () => {
  return (
    <>
      <SignupHeader />
      <BackgroundImg>
        <Container>
          <Box>
            <OauthSignup />
            <Signup />
          </Box>
        </Container>
      </BackgroundImg>
    </>
  );
};

export default SignupPage;

const BackgroundImg = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 4.8rem;
  border-radius: 3.6rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); /* 그림자 효과 */
`;

const Box = styled.div`
  text-align: center;
`;
