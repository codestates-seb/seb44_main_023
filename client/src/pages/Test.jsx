import React, { useState } from "react";
import Input from "../components/Input/ModalInput";
import { FiSend } from "react-icons/fi";
import styled from "styled-components";

const TestContainer = styled.div`
  background-color: #ffe7ba;
  height: 500px;
`;

const FiSendIcon = styled(FiSend)`
  font-size: 16px; /* 크기 조정 */
`;

const TestComponent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [comment, setComment] = useState("");
  const [amount, setAmount] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCommentSubmit = () => {
    console.log("댓글 내용:", comment);
  };

  return (
    <TestContainer>
      <Input
        label="제목"
        placeholder="제목을 입력하세요"
        value={title}
        width="20rem"
        onChange={handleTitleChange}
        focused={true}
      />
      <Input
        label="내용"
        placeholder="내용을 입력하세요"
        value={content}
        width="20rem"
        onChange={handleContentChange}
        focused={false}
      />
      <Input
        type="text"
        placeholder="댓글을 입력하세요"
        value={comment}
        size="20rem"
        onChange={handleCommentChange}
        suffix={<FiSendIcon onClick={handleCommentSubmit} />}
        focused={true}
      />
    </TestContainer>
  );
};

export default TestComponent;
