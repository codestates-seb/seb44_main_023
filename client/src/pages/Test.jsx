import React, { useState } from "react";
import Input from "../components/ModalInput/ModalInput";
import { FiSend } from "react-icons/fi";
import { styled } from "styled-components";

const TestContainer = styled.div`
  background-color: orange;
  height: 500px;
`

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
        size="12.5rem"
        value={title}
        onChange={handleTitleChange}
      />
      <Input
        label="내용"
        placeholder="내용을 입력하세요"
        size="200px"
        value={content}
        onChange={handleContentChange}
      />
      <Input
        label="댓글"
        placeholder="댓글을 입력하세요"
        size="200px"
        value={comment}
        onChange={handleCommentChange}
        suffix={<FiSend onClick={handleCommentSubmit} />}
      />
    </TestContainer>
  );
};

export default TestComponent;
