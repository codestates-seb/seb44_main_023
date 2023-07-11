import styled from 'styled-components';
import { useNavigate } from "react-router-dom"; // react-router-dom에서 useNavigate를 import합니다.
import background from "../assets/home/screens/맑음.png";
import smallLogo from "../assets/home/smallLogo.svg";
import moveTo from "../assets/home/moveTo.svg";

import bigLogo from "../assets/home/BigLogo.svg";

import "../index.css";
import { BsChevronCompactDown } from "react-icons/bs";
import WeatherWidget from "../components/WeatherWidget/WeatherWidget";


const Home = () => {
  const shouldBlur=true;
  const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

  const handleButtonClick = () => {
    navigate("/main"); 
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
            <Button  onClick={handleButtonClick}>Login</Button>
            <Button style={{bottom: '28.4rem'}} onClick={handleButtonClick}>Sign up</Button>
          </HomeDivRow>
          {/* justifyContent: 'center' */}
          <div style={{ display: 'flex',marginTop:'5rem' , justifyContent: 'center', alignItem: 'center'}}>
            <MoveTo src={moveTo}></MoveTo>       
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
export default Home;


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


const Button = styled.button`
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
