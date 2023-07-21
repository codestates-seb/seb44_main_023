import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FloatingButton from "../components/Button/ButtonFloating";
import MainTodo from "../feature/Main/MainTodo";
import MainLedger from "../feature/Main/MainLedger";
import Loading from "../components/Loading/Loading";
import { useStoreHide } from "../store/store.hide";
import { useGetWeatherInfo } from "../store/store.weather";
import WeatherImage from "../feature/Home/WeatherImage";

const MainPage = () => {
  const { isHidden, changeVisibility } = useStoreHide();
  const { weatherType } = useGetWeatherInfo();

  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState({ todo: null, ledger: null });

  const requestGroup = () => {
    let defaultGroup = localStorage.getItem("planfinity-group");
    if (defaultGroup) {
      defaultGroup = JSON.parse(defaultGroup);
      setGroup({
        todo: defaultGroup.todoGroup.key,
        ledger: defaultGroup.ledgerGroup.key,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    requestGroup();
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <HideScreen
        style={{
          opacity: isHidden ? 1 : 0,
          pointerEvents: isHidden ? "initial" : "none",
          transition: "200ms",
        }}
      >
        <WeatherImage weahterType={weatherType} />
        <ButtonWrapper>
          <FloatingButton icon="hide" onClick={changeVisibility} />
        </ButtonWrapper>
      </HideScreen>
      <StyledWrapper
        style={{
          opacity: isHidden ? 0 : 1,
        }}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <div
            style={{
              display: "flex",
              overflow: "hidden",
              height: "100%",
              width: "100%",
            }}
          >
            <MainTodo groupId={group.todo} />
            <MainLedger groupId={group.ledger} />
          </div>
        )}
      </StyledWrapper>
      <ButtonWrapper>
        <FloatingButton icon="hide" onClick={changeVisibility} />
      </ButtonWrapper>
    </div>
  );
};
export default MainPage;

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  position: relative;
  transition: 200ms;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  right: 1.6rem;
  bottom: 1.6rem;
`;

const HideScreen = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
