import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import background from "../assets/background.png";
import ProfileTop from "../feature/Profile/ProfileTop";
import ProfileBottom from "../feature/Profile/ProfileBottom";
import Loading from "../components/Loading/Loading";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileInfo, setProfileInfo] = useState({});

  const { id } = useParams();

  const requestProfileInfo = async () => {
    try {
      const res = {
        status: 200,
        data: {
          member_id: 1,
          nickname: "닉네임",
          email: "example@example.com",
          profile_image:
            "https://i.pinimg.com/474x/df/2d/25/df2d253fbd0eb7d50193f1374128e9f0.jpg",
        },
      };

      // TODO 프로필 정보 받아오기 API 연결
      if (res.status !== 200) throw res;

      setProfileInfo(res.data);
      setTimeout(() => setIsLoading(false), 2000);
    } catch (err) {
      console.log("error 발생", err);
    }
  };

  useEffect(() => {
    requestProfileInfo();
  }, []);

  return (
    <P>
      {/* 후에 레이아웃 적용하게 되면 P는 삭제할 에정 */}
      <StyledWrapper>
        <ProfileBox>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <ProfileTop profileInfo={profileInfo} />
              <ProfileBottom profileInfo={profileInfo} />
            </>
          )}
        </ProfileBox>
      </StyledWrapper>
    </P>
  );
};

export default ProfilePage;

const P = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${background});
  background-repeat: no-repeat;
`;

const StyledWrapper = styled.div`
  padding: 6.4rem 6.4rem 0;
`;

const ProfileBox = styled.div`
  padding: 6.4rem;
  background-color: var(--color-gray-02);
  min-height: calc(100vh - 19.2rem);
  border-radius: 1rem 1rem 0 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: var(--color-gray-06);
`;
