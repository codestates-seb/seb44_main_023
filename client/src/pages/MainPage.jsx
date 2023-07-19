import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/PagesLayout";
import LedgeSummary from "../feature/Main/LedgeSummary";
import TodoSummary from "../feature/Main/TodoSummary";
import FloatingButton from "../components/Button/ButtonFloating";
import Loading from "../components/Loading/Loading";
import { useGetWeatherInfo } from "../store/store.weather";
import WeatherImage from "../feature/Home/WeatherImage";
import { useContentIsNullStore } from "../store/store.contentIsNull";
import MainTodo from "../feature/Main/MainTodo";
import MainLedger from "../feature/Main/MainLedger";

const MainPage = () => {
  return (
    <Layout>
      <StyledWrapper>
        <MainTodo />
        <MainLedger />
      </StyledWrapper>
    </Layout>
  );
};
export default MainPage;

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
`;
