import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../Layout/PagesLayout";
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

  console.log(isHidden);
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
    <>
      <HideScreen style={{ opacity: isHidden ? 1 : 0, transition: "200ms" }}>
        <WeatherImage weahterType={weatherType} />
      </HideScreen>
      <div style={{ opacity: isHidden ? 0 : 1, transition: "200ms" }}>
        <Layout>
          <StyledWrapper>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <MainTodo groupId={group.todo} />
                <MainLedger groupId={group.ledger} />
              </>
            )}
          </StyledWrapper>
        </Layout>
      </div>
      <ButtonWrapper>
        <FloatingButton icon="hide" onClick={changeVisibility} />
      </ButtonWrapper>
    </>
  );
};
export default MainPage;

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  position: relative;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  right: 1.6rem;
  bottom: 1.6rem;
`;

const HideScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
