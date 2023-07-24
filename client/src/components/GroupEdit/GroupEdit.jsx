import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Modal from "../Modal/Modal";
import GroupEditFrame from "../../feature/GroupEdit/GroupEditFrame";
import { useGroupEditStore } from "../../store/store.groupEdit";

const GroupEdit = () => {
  const { isModalVisible, setIsModalVisible } = useGroupEditStore();

  return (
    <>
      <GroupEditModal
        id="editGroup" // 모달 id값
        open={isModalVisible} // 모달 열림 / 닫힘 state값
        closable // 우측 상단 모달 닫힘 버튼 유무 default값 : true
        onClose={() => setIsModalVisible(!isModalVisible)} // 모달 열고 닫는 state 변화 함수
      >
        <GroupEditFrame></GroupEditFrame>
      </GroupEditModal>
    </>
  );
};

const GroupEditModal = styled(Modal)``;
export default GroupEdit;
