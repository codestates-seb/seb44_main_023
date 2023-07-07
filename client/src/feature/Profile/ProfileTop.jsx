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
                <Button onClick={handleCancelEdit} color="var(--color-red-01)">
                  취소
                </Button>
                <Button
                  onClick={handleSaveNickName}
                  color="var(--color-blue-03)"
                >
                  저장
                </Button>
              </div>
            ) : (
              <Button onClick={handleEditMode} color="var(--color-blue-03)">
                수정
              </Button>
            )}
          </div>
        </ProfileWrapper>
        <ButtonWrapper>
          <label htmlFor="avatar">이미지 업로드</label>
          <button onClick={handleDeleteImage}>이미지 제거</button>
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

const Button = styled.button`
  width: min-content;
  font-size: 2rem;
  color: ${({ color }) => color};
  background: none;
`;

const InputNickname = styled(Input)`
  margin-bottom: 1.6rem;
`;
