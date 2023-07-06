import React, { useState } from "react";
import Input from "../components/PageInput/PageInput";

const InputTest = () => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <Input
        label="테스트 인풋"
        placeholder="값을 입력하세요"
        value={value}
        onChange={handleChange}
        size="300px"
        height="20px" /* height 값 추가 */
        fontSize="16px" /* fontSize 값 추가 */
        info="이메일이 잘못되었습니다"
      />
    </div>
  );
};

export default InputTest;
