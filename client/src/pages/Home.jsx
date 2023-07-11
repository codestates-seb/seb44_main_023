import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom"; // react-router-dom에서 useNavigate를 import합니다.
import background from "../assets/home/screens/맑음.png";
import smallLogo from "../assets/home/smallLogo.svg";
import bigLogo from "../assets/home/BigLogo.svg";
import moveTo from "../assets/home/moveTo.svg";
import Button from "../components/Button/Button"
import "../index.css";
import WeatherWidget from "../components/WeatherWidget/WeatherWidget";

const Home = () => {
  const [showDetails, setShowDetails] = useState(false);
  const handleClick = () => {
    setShowDetails(true);
  };

  const handleBack = () => {
    setShowDetails(false);
  };

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
        <DetailedPageComponent onBack={handleBack} />
      ) : (
        <MainComponent onClick={handleClick} />
      )}
    </div>
  );
};
export default Home;


const MainComponent = ({ onClick }) => {
  const shouldBlur=true;
  const navigate = useNavigate(); // useNavigate 훅을 사용합니다.
  const handleLoginButtonClick = () => {
    navigate("/login"); 
  };
  const handleSignUpButtonClick = () => {
    navigate("/signup"); 
  };

  return (
   
    <HomeWrapper>
      <HomeHeader>
          <SmallLogo src={smallLogo}></SmallLogo>
          <WeatherWidget scale={0.95}/>
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
          <div style={{ display: 'flex',marginTop:'5rem' , justifyContent: 'center', alignItem: 'center'}}>
            <MoveTo src={moveTo} onClick={onClick}></MoveTo>       
          </div>
          </HomeContainer> 
        </HomeMain>
    </HomeWrapper>
    
  //   ////실패한작업중인코드 
  //   <HomeWrapper>
  //     <BackgroundImage className={shouldBlur ? 'blurred' : ''}/>
  //     <div style={{zIndex:1}} >
  //     <HomeHeader>
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
  //         <Button  onClick={handleButtonClick}>Login</Button>
  //         <Button style={{bottom: '28.4rem'}} onClick={handleButtonClick}>Sign up</Button>
  //       </HomeDivRow>
  //       {/* justifyContent: 'center' */}
  //       <div style={{ display: 'flex',marginTop:'5rem' , justifyContent: 'center', alignItem: 'center'}}>
  //         <MoveTo src={moveTo}></MoveTo>       
  //       </div>
  //       </HomeContainer> 
  //     </HomeMain>
  //     </div>
     
  // </HomeWrapper>

  );
};
const DetailedPageComponent = ({ onBack }) => {
  return (
    <div>
      <SloganText>상세 설명 페이지</SloganText>
      <SloganText>서비스에 대한 상세 설명입니다.</SloganText>
      <Button onClick={onBack}>뒤로 가기</Button>
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
  display: flex;
  flex-direction : row;
  justify-content: space-between;
  align-items: center;
  padding-left:7.2rem ;
  height: 10%;
`;


// ////실패한작업중인코드 
// const BackgroundImage = styled.div`
//   background-image: url(${background});
//   &.blurred {
//     filter: blur(0.2rem);
//   }
//   background-size: cover;
//   background-position: center;
//   height: 100vh;
// `;

// const HomeWrapper = styled.div`
//   background-size: cover;
//   background-position: center;
//  `


const HomeWrapper = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  height: 100vh;
  `


// const Button = styled.button`
//   font-size: 20px;
//   border-radius: 30px;
//   border: none;
//   padding: 10px 15px 10px 15px;
//   font-weight: 500;
//   background-color: #569fbc;
//   color: #ffffff;
//   cursor: pointer;

//   &:hover {
//     background-color: #42768b;
//   }
// `;
