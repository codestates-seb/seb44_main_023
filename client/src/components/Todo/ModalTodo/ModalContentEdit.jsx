import { styled } from "styled-components";
import Input from "../../Input/ModalInput";
import Button from "../../Button/Button";
import { useEffect, useState } from "react";
import { updateTodo } from "../../../api/todogroups.api";

const ModalContentEdit = ({
  todoInfo,
  handleModalVisible,
  setTodoList,
  setModalType,
}) => {
  const [formData, setFormData] = useState({});

  const {
    member_id,
    todo_id,
    todo_group_id,
    todo_content,
    todo_schedule_date,
    todo_title,
  } = todoInfo;

  const handleUpdateTodo = async (event) => {
    try {
      event.preventDefault();
      const data = {
        ...formData,
      };

      const res = await updateTodo(todo_group_id, todo_id, data);
      setTodoList((todoList) =>
        todoList.map((item) => {
          if (item.todo_id === todo_id) return res;
          return item;
        })
      );
      handleCloseEditModal();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeForm = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleCloseEditModal = () => {
    handleModalVisible();
    setModalType("detail");
  };

  useEffect(() => {
    setFormData({
      ...formData,
      todo_schedule_date,
      todo_title,
      todo_content,
    });
  }, [todoInfo]);

  return (
    <StyledWrapper>
      <form onChange={handleChangeForm}>
        <div className="modal-title">
          <div className="modal-title-text">Todo 수정하기</div>
          <div className="modal-title-date">
            <input
              id="todo_schedule_date"
              type="date"
              defaultValue={todo_schedule_date}
            />
          </div>
        </div>
        <Input
          className="title-input"
          placeholder="제목을 입력하세요"
          fontSize={20}
          id="todo_title"
          defaultValue={todo_title}
          style={{ width: "100%" }}
        />
        <TextArea>
          <textarea
            className="content-textarea"
            id="todo_content"
            defaultValue={todo_content}
          />
        </TextArea>
        <ButtonWrapper>
          <Button
            label="취소"
            size="medium"
            fontcolor="var(--color-blue-03)"
            style={{
              backgroundColor: "var(--color-white)",
              border: "1px solid var(--color-blue-03)",
              color: "var(--color-blue-03)",
            }}
            onClick={handleCloseEditModal}
          />
          <Button
            label="적용하기"
            size="medium"
            fontcolor="var(--color-white)"
            style={{
              backgroundColor: "var(--color-blue-03)",
            }}
            onClick={handleUpdateTodo}
          />
        </ButtonWrapper>
      </form>
    </StyledWrapper>
  );
};

export default ModalContentEdit;

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
      input {
        background: none;
      }
    }
  }

  .title-input {
    padding: 2.4rem 1.2rem;
    border-bottom: 1px solid var(--color-gray-10);
    color: var(--color-gray-11);
  }
`;

const TextArea = styled.div`
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-gray-10);
  margin-bottom: 4.8rem;

  .content-textarea {
    width: calc(100% - 2.4rem);
    height: 28rem;
    resize: none;
    border: 1px solid var(--color-gray-10);
    border-radius: 1rem;
    display: block;
    padding: 1.2rem;
    color: var(--color-gray-11);
    font-family: unset;

    &:active,
    &:focus {
      outline: none;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 1.2rem;
`;
