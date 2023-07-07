import Lottie from "lottie-react";
import { styled } from "styled-components";
import loadingLottie from "../../assets/loading.json";

const Loading = () => {
  return (
    <StyledWrapper>
      <Lottie animationData={loadingLottie} />
      <div className="content">비밀스럽게 준비되고 있습니다...</div>
    </StyledWrapper>
  );
};

export default Loading;

const StyledWrapper = styled.div`
  text-align: center;

  .content {
    color: var(--color-gray-09);
    font-size: 2.4rem;
  }
`;
