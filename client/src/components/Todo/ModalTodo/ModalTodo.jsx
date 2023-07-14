import { useState } from "react";
import ModalContentDetail from "./ModalContentDetail";
import ModalContentCreate from "./ModalContentCreate";
import Modal from "../../Modal/Modal";

const ModalTodo = ({
  isModalVisible,
  setIsModalVisible,
  type = "create",
  defaultDate,
  todoId,
}) => {
  const [modalType, setModalType] = useState(type);

  const handleModalVisible = () => setIsModalVisible(!isModalVisible);

  const content =
    modalType === "create" ? (
      <ModalContentCreate
        defaultDate={defaultDate}
        handleModalVisible={handleModalVisible}
      />
    ) : modalType === "detail" ? (
      <ModalContentDetail
        todoId={todoId}
        handleModalVisible={handleModalVisible}
        setModalType={setModalType}
      />
    ) : (
      <></>
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
