// import React, { useState, useEffect, useRef } from 'react';
// import styled, { keyframes } from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import smallLogo from '../assets/home/smallLogo.svg';
// import bigLogo from '../assets/home/BigLogo.svg';
// import moveTo from '../assets/home/moveTo.svg';
// import '../index.css';

// import Main from '../feature/Home/Main';
// import DetailedPage from '../feature/Home/DetailedPage';
// import { useGetWeatherInfo } from '../store/store.weather';
// import Button from '../components/Button/Button';

// const Home = () => {
//   const weather = useGetWeatherInfo();
//   const weatherType = weather.type;
//   const detailedPageRef = useRef(null);
// //  const [showDetails, setShowDetails] = useState(false);

//   const handleClick = () => {
//     detailedPageRef.current.scrollIntoView({ behavior: 'smooth' });
//     setTimeout(() => {
//       // setShowDetails(true);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }, 500);
//   };
//   const handleBack = () => {
//     detailedPageRef.current.scrollIntoView({ behavior: 'smooth' });
//   };


//   const handleScroll = () => {
//         const scrollPosition = window.scrollY;
//         // 페이지 전환 조건을 정의합니다. 예를 들어, 스크롤이 300px 이상 이동했을 때 페이지 전환을 수행합니다.
//         if (scrollPosition >= 50) {
//           // setShowDetails(true);
//           console.log("여기들어왓지롱!")
//           handleBack;
//         }else{
//           console.log("다시여기지롱~")
//           handleClick;
//         }
       
//       };

//   window.addEventListener('wheel', handleScroll);

// return (
//   <HomeWrapper>
//     <Main onClick={handleBack} weatherType={weatherType} />
//     <DetailedPageWrapper ref={detailedPageRef}>
//       <DetailedPage onClick={handleClick} weatherType={weatherType} />
//     </DetailedPageWrapper>
//   </HomeWrapper>
// );
// };


// const HomeWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   background-position: center;
//   height: 200vh;
// `;

// const DetailedPageWrapper = styled.div`
//   scroll-behavior: smooth;
// `;

// export default Home;

