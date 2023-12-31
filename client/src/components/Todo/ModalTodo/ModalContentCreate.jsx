import { styled } from "styled-components";
import Input from "../../Input/ModalInput";
import Button from "../../Button/Button";
import { useEffect, useState } from "react";
import { createTodo } from "../../../api/todogroups.api";

const ModalContentCreate = ({
  groupId,
  defaultDate,
  handleModalVisible,
  setTodoList,
}) => {
  const [formData, setFormData] = useState({
    ...(defaultDate !== "null" ? { todo_schedule_date: defaultDate } : {}),
  });

  const handleCreateTodo = async (event) => {
    try {
      event.preventDefault();
      const data = {
        member_id: 1,
        ...formData,
      };

      const res = await createTodo(groupId, data);
      setTodoList((todoList) => [...todoList, res]);
      handleModalVisible();
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

  useEffect(() => {
    setFormData({
      ...formData,
      ...(defaultDate !== "null" ? { todo_schedule_date: defaultDate } : {}),
    });
  }, [defaultDate]);

  return (
    <StyledWrapper>
      <form onChange={handleChangeForm}>
        <div className="modal-title">
          <div className="modal-title-text">Todo 추가하기</div>
          <div className="modal-title-date">
            <input
              id="todo_schedule_date"
              type="date"
              defaultValue={defaultDate}
            />
          </div>
        </div>
        <Input
          className="title-input"
          placeholder="제목을 입력하세요"
          fontSize={20}
          id="todo_title"
          style={{ width: "100%" }}
        />
        <TextArea>
          <textarea className="content-textarea" id="todo_content" />
        </TextArea>
        <ButtonWrapper>
          <Button
            label="취소"
            size="medium"
            fontcolor="var(--color-blue-03)"
            backgroundColor={"var(--color-white)"}
            hovercolor={"var(--color-gray-03)"}
            style={{
              border: "1px solid var(--color-blue-03)",
              color: "var(--color-blue-03)",
            }}
            onClick={handleModalVisible}
          />
          <Button
            label="추가하기"
            size="medium"
            backgroundColor={"var(--color-blue-03)"}
            hovercolor={"var(--color-blue-04)"}
            onClick={handleCreateTodo}
          />
        </ButtonWrapper>
      </form>
    </StyledWrapper>
  );
};

export default ModalContentCreate;

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
      /* cursor: pointer; */
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
