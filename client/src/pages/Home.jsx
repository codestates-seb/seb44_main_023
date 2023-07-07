import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // react-router-dom에서 useNavigate를 import합니다.
import background from "../assets/screens/맑음.png";
import smallLogo from "../assets/smallLogo.svg";
import bigLogo from "../assets/BigLogo.svg";

import "../index.css";
import { BsChevronCompactDown } from "react-icons/bs";


const Home = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

  const handleButtonClick = () => {
    navigate("/main"); 
  };

  return (
    
    <HomeWrapper>
     <SmallLogo src={smallLogo}> 
     </SmallLogo>
      <HomeContainer>
        <div>
          <BigLogo src={bigLogo}>
          </BigLogo>
          <SloganText>
          일정과 가계부를 한번에 관리할 수 있습니다.
          </SloganText>
        </div>
        {/* <HomeDivRow style={{ bottom: '28.4rem'}} > */}
        {/* position :'relative' */}
        <HomeDivRow>
          <Button  onClick={handleButtonClick}>Login</Button>
          <Button style={{bottom: '28.4rem'}} onClick={handleButtonClick}>Sign up</Button>
        </HomeDivRow>
        <div style={{bottom: '43.5rem'}}>
          <BsChevronCompactDown size='40' color="white"  onClick={handleButtonClick}/>
        </div>
      </HomeContainer>
    </HomeWrapper>
  );
};

const Section2 = () => {
  return (
    <div>
      <h2>Section 2</h2>
      <p>This is Section 2 content</p>
      <button>
        <Link to="/home">Go back to Main</Link>
      </button>
    </div>
  );
};


export default Home;

const SmallLogo = styled.img`
  position :absolute;
  width: 15rem;
  height: 4.5rem;
  top: 2rem;
  left: 4.7rem;
`
const BigLogo = styled.img`
  position :relative;
  width: 38.8rem;
  height: 9.7rem;
`
const SloganText = styled.div`
  position :relative;
  bottom:2.5rem
  font-family: "Noto Sans", sans-serif;
  font-size: 2.0rem;
  line-height: 2.7rem;
  letter-spacing: 0em;
  color: var(--color-gray-09);
  
`
//폰트싸이즈 2.2에서 2로변경
// top: 524px
// left: 675px
//  text-align: center;
//  font-weight: 400;
//border: 5px solid red;
const HomeDivRow= styled.div`
  position :relative;
  
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
`
//bottom : 28.4rem;
const HomeWrapper = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HomeContainer = styled.div`
  display: flex;
  margin-top = ;
  justify-content: center;

  flex-direction : column;
  text-align: center;
  height: 46.6rem;
  
`;
//left: 66.6rem;
// top: 39.7rem;
//border: 5px solid red;

const Button = styled.button`
  margin: 32px;
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
//171/42