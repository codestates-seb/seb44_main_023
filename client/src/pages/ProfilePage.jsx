import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import background from "../assets/background.png";
import ProfileTop from "../feature/Profile/ProfileTop";
import ProfileBottom from "../feature/Profile/ProfileBottom";
import Loading from "../components/Loading/Loading";
import { readMemberInfo } from "../api/members.api";
import Layout from "../Layout/PagesLayout";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileInfo, setProfileInfo] = useState({});

  const { id } = useParams();

  const requestProfileInfo = async () => {
    const profileInfo = await readMemberInfo(id);
    setProfileInfo(profileInfo);
    setIsLoading(false);
  };

  useEffect(() => {
    requestProfileInfo();
  }, []);

  return (
    <Layout>
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
    </Layout>
  );
};

export default ProfilePage;

const P = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
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
