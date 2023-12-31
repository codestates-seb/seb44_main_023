import styled from "styled-components";
import ProfileTop from "../feature/Profile/ProfileTop";
import ProfileBottom from "../feature/Profile/ProfileBottom";
import Loading from "../components/Loading/Loading";
import { useGetUserInfo } from "../store/store.userInfo";

const ProfilePage = () => {
  const userInfo = useGetUserInfo();
  const { isLoading } = userInfo;

  return (
    <StyledWrapper>
      <ProfileBox>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <ProfileTop profileInfo={userInfo} />
            <ProfileBottom profileInfo={userInfo} />
          </>
        )}
      </ProfileBox>
    </StyledWrapper>
  );
};

export default ProfilePage;

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
