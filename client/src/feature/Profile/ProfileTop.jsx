import { useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input/PageInput";

const ProfileTop = () => {
  const [isEditMode, setEditMode] = useState(false);
  const [nickname, setNickname] = useState("진아");
  const [imageUrl, setImageUrl] = useState(null);

  const handleEditMode = () => setEditMode(!isEditMode);

  const handleCancelEdit = () => {
    setEditMode(!isEditMode);
  };

  const handleSaveNickName = async () => {
    try {
      setEditMode(!isEditMode);
    } catch (err) {}
  };

  const [imageFile, setImageFile] = useState();

  const readURL = (event) => {
    setImageFile(event.target.files[0]);
    const res = URL.createObjectURL(event.target.files[0]);
    if (imageFile) {
      const formData = new FormData();
      formData.append("files", imageFile);
    }
    // TODO 서버에 이미지 업로드
    setImageUrl(res);
  };

  const handleDeleteImage = (event) => {
    event.preventDefault();
    // TODO 서버에서 이미지 삭제
    setImageFile();
    setImageUrl();
  };

  return (
    <StyledWrapper>
      <form>
        <ProfileWrapper>
          <div className="profile-image">
            <input type="file" id="avatar" onChange={readURL} />
            <img id="preview" src={imageUrl} />
          </div>
          <div className="nickname-wrapper">
            {isEditMode ? (
              <InputNickname
                onChange={(e) => setNickname(e.target.value)}
                defaultValue={nickname}
                minLength={3}
                maxLength={10}
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
    background-color: var(--color-gray-03);
    border-radius: 100%;
    overflow: hidden;

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

const InputNickname = styled(Input)`
  margin-bottom: 1.6rem;
`;

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
