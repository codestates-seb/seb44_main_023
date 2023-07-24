import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <ClockWrapper>
      <Title>PlanFinity</Title>
      <Time>{formatTime(currentTime)}</Time>
    </ClockWrapper>
  );
};

const ClockWrapper = styled.div``;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: var(--color-gray-09);
`;
const Time = styled.div`
  font-size: 160px;
  color: #202020f8;
  font-weight: 600;
  font-family: "Pretendard-Regular", sans-serif;

  @font-face {
    font-family: "Pretendard-Regular";
    src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
      format("woff");
    font-weight: 400;
    font-style: normal;
  }
`;
export default Clock;
