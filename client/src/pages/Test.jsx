import React, { useState } from "react";
import Input from "../components/Input/PageInput";
import { FiSend } from "react-icons/fi";
import styled from "styled-components";

const TestContainer = styled.div`
  background-color: #ffe7ba;
  height: 500px;
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("댓글 내용:", comment);
    }
  };

  return (
    <TestContainer>
      <Input
        placeholder="제목을 입력하세요"
        value={title}
        width="20rem"
        onChange={handleTitleChange}
        info="이메일이 잘못되었습니다"
      />
      <Input
        placeholder="댓글을 입력하세요"
        value={comment}
        width="20rem"
        onChange={handleCommentChange}
        onKeyPress={handleKeyPress}
      />
    </TestContainer>
  );
};

export default TestComponent;
