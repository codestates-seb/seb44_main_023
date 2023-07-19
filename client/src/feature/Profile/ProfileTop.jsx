import { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input/PageInput";
import Avatar from "../../assets/userAvarta.png";
import {
  deleteProfileImage,
  readProfileImage,
  updateMemberNickname,
  updateProfileImage,
} from "../../api/members.api";
import { imageCompress } from "../../utils/imageCompress";

const ProfileTop = ({ profileInfo }) => {
  const [isEditMode, setEditMode] = useState(false);
  const [nickname, setNickname] = useState(profileInfo.nickname);
  const [nicknameInput, setNicknameInput] = useState(profileInfo.nickname);
  const [imageUrl, setImageUrl] = useState(profileInfo.profileImage);
  const [validation, setValidation] = useState("");

  const handleEditMode = () => setEditMode(!isEditMode);

  const handleCancelEdit = () => {
    setEditMode(!isEditMode);
    setNicknameInput(nickname);
    setValidation("");
  };

  const handleSaveNickName = async (event) => {
    try {
      event.preventDefault();
      await updateMemberNickname(profileInfo.memberId, nicknameInput);
      setEditMode(!isEditMode);
      setValidation("");
      setNickname(nicknameInput);
    } catch (err) {
      setValidation(err.response.data);
    }
  };

  const readURL = async (event) => {
    try {
      let fileBlob = event.target.files[0];
      if (!fileBlob) return;

      if (fileBlob.size > 1024 * 1024) {
        fileBlob = await imageCompress(fileBlob);
      }

      const res = URL.createObjectURL(fileBlob);
      const formData = new FormData();
      formData.append("file", fileBlob);

      await updateProfileImage(profileInfo.memberId, formData);
      setImageUrl(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteImage = async (event) => {
    try {
      event.preventDefault();
      if (Avatar === imageUrl) return;
      await deleteProfileImage(profileInfo.memberId);
      setImageUrl(Avatar);
    } catch (err) {
      console.log(err);
    }
  };

  const handleErrorImage = (e) => {
    console.log("error");
    e.target.src = Avatar;
  };

  return (
    <StyledWrapper>
      <form>
        <ProfileWrapper>
          <div className="profile-image">
            <input
              type="file"
              id="avatar"
              onChange={readURL}
              accept="image/*"
            />
            <img id="preview" src={imageUrl} onError={handleErrorImage} />
          </div>
          <div className="nickname-wrapper">
            {isEditMode ? (
              <InputNickname
                onChange={(e) => setNicknameInput(e.target.value)}
                defaultValue={nickname}
                minLength={2}
                maxLength={10}
                info={validation}
              />
            ) : (
              <div className="nickname">{nickname}</div>
            )}
            {isEditMode ? (
              <div className="nickname-button-wrapper">
                <TextButton
                  onClick={handleCancelEdit}
                  color="var(--color-red-01)"
                >
                  취소
                </TextButton>
                <TextButton
                  onClick={handleSaveNickName}
                  color="var(--color-blue-03)"
                >
                  저장
                </TextButton>
              </div>
            ) : (
              <TextButton onClick={handleEditMode} color="var(--color-blue-03)">
                수정
              </TextButton>
            )}
          </div>
        </ProfileWrapper>
        <ButtonWrapper>
          <label htmlFor="avatar">
            <MediumButton className="medium-button add">
              이미지 추가
            </MediumButton>
          </label>
          <MediumButton
            className="mediumn-button delete"
            onClick={handleDeleteImage}
          >
            이미지 제거
          </MediumButton>
        </ButtonWrapper>
      </form>
    </StyledWrapper>
  );
};

export default ProfileTop;

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 80rem;
  margin-bottom: 4rem;
`;

const ProfileWrapper = styled.div`
  display: flex;
  gap: 4rem;
  margin-bottom: 4rem;
  max-width: 80rem;
  width: 100%;

  .profile-image {
    min-width: 16rem;
    min-height: 16rem;
    width: 16rem;
    height: 16rem;
    border-radius: 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    input {
      display: none;
    }
  }

  .nickname-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .nickname {
      width: 100%;
      font-size: 4.8rem;
      font-weight: bold;
      margin-bottom: 1.6rem;
      min-height: 6rem;
      word-break: break-all;
    }
  }

  .nickname-button-wrapper {
    display: flex;
    font-size: 2rem;
    gap: 2rem;
    margin-top: 1.6rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16rem;
  flex-direction: column;
  gap: 1.6rem;
  white-space: normal;
  margin-bottom: 2rem;
`;

const TextButton = styled.button`
  width: min-content;
  font-size: 2rem;
  color: ${({ color }) => color};
  background: none;
`;

const InputNickname = styled(Input)``;

const MediumButton = styled.div`
  width: 12.4rem;
  height: 3.6rem;
  font-size: 1.6rem;
  border-radius: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 200ms;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  &.add {
    background-color: var(--color-blue-03);
    color: var(--color-white);

    &:hover {
      background-color: var(--color-blue-04);
    }
  }

  &.delete {
    background-color: var(--color-white);
    color: var(--color-blue-03);
    border: 0.15rem solid var(--color-blue-03);

    &:hover {
      filter: brightness(90%) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }
  }
`;
