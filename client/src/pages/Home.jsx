import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom"; // react-router-dom에서 useNavigate를 import합니다.
import smallLogo from "../assets/home/smallLogo.svg";
import bigLogo from "../assets/home/BigLogo.svg";
import moveTo from "../assets/home/moveTo.svg";
import Button from "../components/Button/Button"
import "../index.css";
import WeatherWidget from "../components/WeatherWidget/WeatherWidget";
import { useGetWeatherInfo } from "../store/store.weather";
import WeatherImage from '../feature/Home/WeatherImage';

const Home = () => {
  const [showDetails, setShowDetails] = useState(false);
  const weather = useGetWeatherInfo();
  const weatherType =weather.type;
  
  const handleClick = () => {
    setShowDetails(true);
  };

  const handleBack = () => {
    setShowDetails(false);
  };

  // const imgName = getWeatherImage(weatherType);
  // const imgSrc = `../assets/home/screens/${imgName}`;
  // console.log("Home:",imgSrc)

 useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // 페이지 전환 조건을 정의합니다. 예를 들어, 스크롤이 500px 이상 이동했을 때 페이지 전환을 수행합니다.
      if (scrollPosition >= 500) {
        setShowDetails(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  
  return (
    <div>
      {showDetails ? (
        <DetailedPageComponent onBack={handleBack} weatherType={3} />
      ) : (
        <MainComponent onClick={handleClick} weatherType={weatherType} />
      )}
    </div>
  );
};
export default Home;


const MainComponent = ({ onClick , weatherType}) => {
  const shouldBlur=true;
  const navigate = useNavigate(); // useNavigate 훅을 사용합니다.
  const handleLoginButtonClick = () => {
    navigate("/login"); 
  };
  const handleSignUpButtonClick = () => {
    navigate("/signup"); 
  };

  return (
    // <WeatherImage>
    //   {/* <WeatherImage weatherType={weatherType}/> */}
    //   <HomeHeader >
    //       <SmallLogo src={smallLogo}></SmallLogo>
    //       <WeatherWidget scale={0.95}/>
    //     </HomeHeader>
    //     <HomeMain>
    //       <HomeContainer>
    //       <HomeDivCol>
    //         <BigLogo src={bigLogo}></BigLogo>
    //         <SloganText>
    //           일정과 가계부를 한번에 관리할 수 있습니다.
    //         </SloganText>
    //       </HomeDivCol>
    //       <HomeDivRow>
    //         <Button
    //           label="Login" // 버튼 Text 지정
    //           size="large" // 버튼 사이즈
    //           onClick={handleLoginButtonClick} // onClick
    //         />
    //         <Button
    //           label="Sign up" // 버튼 Text 지정
    //           size="large" // 버튼 사이즈
    //           onClick={handleSignUpButtonClick} // onClick
    //         />
    //       </HomeDivRow>
    //       {/* justifyContent: 'center' */}
    //       <div style={{ display: 'flex',marginTop:'5rem' , justifyContent: 'center', alignItem: 'center'}}>
    //         <MoveTo src={moveTo} onClick={onClick}></MoveTo>       
    //       </div>
    //       </HomeContainer> 
    //     </HomeMain>
    // </WeatherImage>

   <>
   <WeatherImage weatherType={weatherType} style={{zIndex:"-1"}}/>
<HomeWrapper >
<HomeHeader>
      <SmallLogo src={smallLogo}></SmallLogo>
      <WeatherWidget scale={0.95} />
    </HomeHeader>
    <HomeMain>
      <HomeContainer>
        <HomeDivCol>
          <BigLogo src={bigLogo}></BigLogo>
          <SloganText>
            일정과 가계부를 한번에 관리할 수 있습니다.
          </SloganText>
        </HomeDivCol>
        <HomeDivRow>
          <Button
            label="Login" // 버튼 Text 지정
            size="large" // 버튼 사이즈
            onClick={handleLoginButtonClick} // onClick
          />
          <Button
            label="Sign up" // 버튼 Text 지정
            size="large" // 버튼 사이즈
            onClick={handleSignUpButtonClick} // onClick
          />
        </HomeDivRow>
        {/* justifyContent: 'center' */}
        <div
          style={{ display: "flex", marginTop: "5rem", justifyContent: "center", alignItem: "center" }}
        >
          <MoveTo src={moveTo} onClick={onClick}></MoveTo>
        </div>
      </HomeContainer>
    </HomeMain>
</HomeWrapper>
   
  </>
  );
};
const DetailedPageComponent = ({ onBack , weatherType}) => {
  return (
    <div>
      <Button
              label="뒤로 가기" // 버튼 Text 지정
              size="large" // 버튼 사이즈
              onClick={onBack} // onClick
      />
    
      <SloganText>상세 설명 페이지</SloganText>
      <SloganText>서비스에 대한 상세 설명입니다.</SloganText>
      <WeatherImage weatherType={weatherType}/>
    </div>  
  );
};


const MoveTo = styled.img`
  width: 6.4rem;
  height: 3.2rem;
`
const SmallLogo = styled.img`
  width: 15rem;
  height: 4.5rem;
`
const BigLogo = styled.img`
  width: 38.8rem;
  height: 9.7rem;
`
const SloganText = styled.div`
  margin-top:2.5rem;
  font-size: 2.0rem;
  line-height: 2.7rem;
  letter-spacing: 0em;
  color: var(--color-gray-09);
`
const HomeDivRow= styled.div`
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 13.5rem;
 `
const HomeDivCol= styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
`
const HomeContainer = styled.div`
  display: flex;
  flex-direction : column;
  text-align: center;
  height: 60%;
`;

const HomeMain = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  height: 90%;
`;
const HomeHeader = styled.div`
  position: relative;;

  display: flex;
  flex-direction : row;
  justify-content: space-between;
  align-items: center;
  padding-left:7.2rem ;
  height: 10%;
`;

const HomeWrapper = styled.div`
position:absolute;
top:0rem;
width:100%;
height:100vh;
  background-position: center;
 `



// const HomeWrapper = styled.div`
//   background-size: cover;
//   background-position: center;
//   height: 100vh;
//   background-image: url(${background});
//   `
//   // /* background-image: url(${background}); */

