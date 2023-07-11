import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // react-router-dom에서 useNavigate를 import합니다.
import background from "../assets/screens/맑음.png";
import smallLogo from "../assets/smallLogo.svg";
import bigLogo from "../assets/BigLogo.svg";
import React, { useState, useEffect } from 'react';
import "../index.css";
import { BsChevronCompactDown } from "react-icons/bs";

const SimpleImageComponent = ({ onClick }) => {
  return (
    <div>
      <h1>간단한 이미지</h1>
      <img src="path/to/image" alt="간단한 이미지" />
      <button onClick={onClick}>더 자세히</button>
    </div>
  );
};

// 상세 설명 페이지를 보여주는 컴포넌트
const DetailedPageComponent = ({ onBack }) => {
  return (
    <div>
      <h1>상세 설명 페이지</h1>
      <p>이미지에 대한 상세 설명입니다.</p>
      <button onClick={onBack}>뒤로 가기</button>
    </div>
  );
};
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
        <SimpleImageComponent onClick={handleClick} />
      )}
    </div>
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

