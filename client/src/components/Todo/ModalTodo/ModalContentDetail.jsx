import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import {
  deleteTodo,
  readTodo,
  readTodoComment,
} from "../../../api/todogroups.api";
import { useGetUserInfo } from "../../../store/store.userInfo";
import Button from "../../Button/Button";
import TodoComment from "./TodoComment";

const ModalContentDetail = ({
  todoId,
  handleModalVisible,
  setModalType,
  todoInfo,
  setTodoInfo,
  setTodoList,
  groupId,
}) => {
  const [todoComment, setTodoComment] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const userInfo = useGetUserInfo();

  const requestTodoInfo = async () => {
    try {
      setIsLoading(true);
      const todoInfo = await readTodo(groupId, todoId);
      const todoComment = await readTodoComment(groupId, todoId);
      setTodoInfo(todoInfo);
      setTodoComment(todoComment.reverse());
      setIsLoading(false);
    } catch (err) {}
  };

  useEffect(() => {
    requestTodoInfo();
  }, []);

  if (isLoading) return null;

  const { todo_id, todo_title, todo_content, todo_schedule_date } = todoInfo;

  const handleDeleteTodo = async () => {
    try {
      await deleteTodo(groupId, todo_id);
      setTodoList((todoList) =>
        todoList.filter((item) => item.todo_id != todo_id)
      );

      handleModalVisible();
    } catch (err) {}
  };

  return (
    <StyledWrapper>
      <div className="modal-title">
        <div className="modal-title-text">Todo</div>
        <div className="modal-title-date">
          {todo_schedule_date !== "null" && todo_schedule_date}
        </div>
      </div>
      <div className="todo-title">{todo_title}</div>
      <div className="todo-content">{todo_content}</div>
      <TodoComment
        groupId={groupId}
        todoId={todo_id}
        isEdit={true}
        setTodoComment={setTodoComment}
        member_id={userInfo.memberId}
        nickname={userInfo.nickname}
        profile_image={userInfo.profileImage}
      />
      <CommentWrapper>
        {todoComment.map((item, index) => (
          <TodoComment
            key={`comment-${index}`}
            groupId={groupId}
            todoId={todo_id}
            {...item}
          />
        ))}
      </CommentWrapper>
      <ButtonWrapper>
        <Button
          label="삭제하기"
          size="medium"
          backgroundColor={"var(--color-white)"}
          hovercolor={"var(--color-gray-03)"}
          style={{
            border: "1px solid var(--color-red-01)",
            color: "var(--color-red-01)",
          }}
          onClick={handleDeleteTodo}
        />
        <Button
          label="수정하기"
          size="medium"
          backgroundColor={"var(--color-blue-03)"}
          hovercolor={"var(--color-blue-04)"}
          onClick={() => setModalType("edit")}
        />
      </ButtonWrapper>
    </StyledWrapper>
  );
};

export default ModalContentDetail;

const StyledWrapper = styled.div`
  color: var(--color-gray-11);
  padding: 2.4rem;
  width: 100%;

  .modal-title {
    font-size: 2.4rem;
    padding-right: 2.4rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-gray-10);
    padding-bottom: 2.4rem;

    .modal-title-date {
      font-size: 2rem;
    }
  }

  .todo-title {
    padding: 2.4rem 0;
    font-size: 2rem;
    border-bottom: 1px solid var(--color-gray-10);
    word-break: break-all;
  }

  .todo-content {
    height: 16rem;
    overflow-y: scroll;
    padding: 2.4rem 0;
    font-size: 2rem;
    border-bottom: 1px solid var(--color-gray-10);
    word-break: break-all;
  }
`;

const CommentWrapper = styled.div`
  height: 18rem;
  overflow-y: scroll;
  width: 100%;
  margin-bottom: 1.6rem;
  border-bottom: 1px solid var(--color-gray-10);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2.4rem;
`;
