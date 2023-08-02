import { styled } from "styled-components";
import { FiSend } from "react-icons/fi";
import Input from "../../Input/ModalInput";
import { createTodoComment } from "../../../api/todogroups.api";
import { useState } from "react";
import Avatar from "../../../assets/userAvarta.png";

const TodoComment = ({
  member_id,
  nickname,
  profile_image,
  comment_content,
  todoId,
  groupId,
  isEdit = false,
  setTodoComment,
}) => {
  const [comment, setComment] = useState("");
  console.log(comment_content, profile_image);
  const handleCreate = async () => {
    try {
      const res = await createTodoComment(groupId, todoId, member_id, comment);
      setTodoComment((todoComment) => [res, ...todoComment]);
      setComment("");
    } catch (err) {}
  };

  const handleErrorImage = (e) => {
    e.target.src = Avatar;
  };

  return (
    <StyledWrapper>
      <div className="user-profile">
        <img
          src={profile_image}
          className="profile-image"
          onError={handleErrorImage}
        />
        <div className="profile-nickname">{nickname}</div>
      </div>
      <div className="comment-content">
        {isEdit ? (
          <CommentInput
            fontSize={16}
            placeholder="댓글을 입력해주세요"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        ) : (
          comment_content
        )}
      </div>
      {isEdit && <AddButton onClick={handleCreate} />}
    </StyledWrapper>
  );
};

export default TodoComment;

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0.4rem 0;
  border-bottom: 1px solid var(--color-gray-04);

  &:last-child {
    border-bottom: unset;
  }

  .user-profile {
    margin-right: 2rem;
    text-align: center;

    .profile-image {
      width: 5rem;
      height: 5rem;
      border-radius: 100%;
    }

    .profile-nickname {
      font-size: 1.2rem;
    }
  }

  .comment-content {
    width: 100%;
    font-size: 1.6rem;
    color: var(--color-gray-13);
  }
`;

const CommentInput = styled(Input)`
  padding: 0;
  width: 100%;
  height: 100%;
`;

const AddButton = styled(FiSend)`
  font-size: 2.4rem;
  color: var(--color-gray-13);
  cursor: pointer;

  &:hover {
    color: var(--color-blue-03);
  }
`;
