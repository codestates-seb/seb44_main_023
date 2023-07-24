import React from "react";
import styled from "styled-components";
import penLogo from "../../assets/logo/pen_logo.png";
import { AiFillGithub } from "react-icons/ai";

const Detail = () => {
  return (
    <DetailWarpper>
      <DetailContainer>
        <TitleSection>
          <ContentsDiv>
            <PenLogo src={penLogo}></PenLogo>
            <Title> TEAM 23 PlanFinity </Title>
            <Guide>
              PlanFinity는 Plan(일정 관리), Finance(금융) 그리고
              Infinity(무한성) 합성어로
              <br />
              무한한 가능성과 편의성을 제공하는 서비스를 만들겠습니다.
            </Guide>
          </ContentsDiv>
        </TitleSection>
        <NameWellpaper>
          <NameContainer>
            <NameSection>
              <NameList>FE</NameList>
              <Name>안지수 부팀장</Name>
              <GithubLink
                href="https://github.com/Scarlett0JS"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub /> Scarlett_JS
              </GithubLink>
              <Name>김유진</Name>
              <GithubLink
                href="https://github.com/wwwwswe"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub /> wwwwswe
              </GithubLink>
              <Name>김진아</Name>
              <GithubLink
                href="https://github.com/wlsdk7245"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub /> wlsdk7245
              </GithubLink>
              <Name>장윤희</Name>
              <GithubLink
                href="https://github.com/yuneejang"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub /> yuneejang
              </GithubLink>
            </NameSection>
            <NameSection>
              <NameList>BE</NameList>
              <Name>조성건 팀장</Name>
              <GithubLink
                href="https://github.com/Seonggeon2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub /> Seonggeon2
              </GithubLink>
              <Name>유승연</Name>
              <GithubLink
                href="https://github.com/Seungyeon3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub /> Seungyeon3
              </GithubLink>
              <Name>조승아</Name>
              <GithubLink
                href="https://github.com/hiimsajo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub /> hiimsajo
              </GithubLink>
            </NameSection>
          </NameContainer>

            <TeamLink
              href="https://github.com/codestates-seb/seb44_main_023"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillGithub /> TEAM 23
            </TeamLink>
      
        </NameWellpaper>
      </DetailContainer>
    </DetailWarpper>
  );
};

const DetailWarpper = styled.div`
  background-position: center;
  width: 100%;
  height: 100vh;
  display: flex;
  background: rgba(36, 36, 36, 0.911);
`;

const DetailContainer = styled.div`
  width: 100%;
  display: flex;
`;

const TitleSection = styled.div`
  display: flex;
  background: white;
  width: 60%;
`;

const ContentsDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin-top: 24rem;
  gap: 60px;
`;

const Title = styled.div`
  font-size: 3rem;
  margin-left: 1rem;
  line-height: 2.7rem;
  letter-spacing: 0em;
  color: black;
`;

const PenLogo = styled.img`
  width: 120px;
`;

const Guide = styled.div`
  font-size: 1.8rem;
`;

const NameWellpaper = styled.div`
  background-color: #4482b7;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NameContainer = styled.div`
  background-color: #4482b7;
  width: 40%;
  display: flex;
  gap: 170px;
  justify-content: center;
  padding: 15rem;
  width: 100%;
  margin-top: 7rem;
`;

const NameSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NameList = styled.div`
  color: #ffffff;
  font-size: 3.6rem;
  padding-bottom: 20px;
`;

const Name = styled.div`
  color: #ffffff;
  font-size: 2rem;
  margin-top: 16px;
  font-family: "SUIT-Regular";

  @font-face {
    font-family: "SUIT-Regular";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2")
      format("woff2");
    font-weight: 500;
    font-style: normal;
  }
`;

const GithubLink = styled.a`
  color: #ffffff;
  font-size: 1.6rem;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: var(--color-black);
  }
`;

const TeamLink = styled.a`
  color: #ffffff;
  font-size: 2rem;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: var(--color-black);
  }
`;

export default Detail;
