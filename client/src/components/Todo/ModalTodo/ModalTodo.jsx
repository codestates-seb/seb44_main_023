import { useState } from "react";
import ModalContentDetail from "./ModalContentDetail";
import ModalContentCreate from "./ModalContentCreate";
import Modal from "../../Modal/Modal";
import ModalContentEdit from "./ModalContentEdit";

const ModalTodo = ({
  isModalVisible,
  setIsModalVisible,
  type = "create",
  defaultDate,
  todoId,
  groupId,
  setTodoList,
}) => {
  const [modalType, setModalType] = useState(type);
  const [todoInfo, setTodoInfo] = useState();

  const handleModalVisible = () => setIsModalVisible(!isModalVisible);

  const content =
    modalType === "create" ? (
      <ModalContentCreate
        groupId={groupId}
        defaultDate={defaultDate}
        handleModalVisible={handleModalVisible}
        setTodoList={setTodoList}
      />
    ) : modalType === "detail" ? (
      <ModalContentDetail
        todoId={todoId}
        groupId={groupId}
        handleModalVisible={handleModalVisible}
        setModalType={setModalType}
        todoInfo={todoInfo}
        setTodoInfo={setTodoInfo}
        setTodoList={setTodoList}
      />
    ) : (
      <ModalContentEdit
        todoInfo={todoInfo}
        handleModalVisible={handleModalVisible}
        setModalType={setModalType}
        setTodoList={setTodoList}
      />
    );

  return (
    <Modal
      id={`modal-${type}-todo`}
      open={isModalVisible}
      onClose={handleModalVisible}
      bodyStyle={{
        width: "120rem",
      }}
    >
      {content}
    </Modal>
  );
};

export default ModalTodo;
