import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import background from "../assets/background.png";

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <BackgroundImage src={background} />
      <Header />
      <LayoutContent>
        <Sidebar />
        <Content>{children}</Content>
      </LayoutContent>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const LayoutContent = styled.div`
  display: flex;
  height: 100%;
`;

const Content = styled.div`
  flex: 1;
  padding-top: 6rem;
  padding-left: 8rem;
  width: 100%;
`;

export default Layout;
