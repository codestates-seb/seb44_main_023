import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/PageInput";

const GroupEdit = () => {

	const handleInputChange =()=>{}
	const handleSubmitSave =()=>{
		console.log("작은 버튼 handleSubmitSave")
	}
	const handleSubmitCancle =()=>{
		console.log("그룹삭제")
	}

	return(
		<GroupWapper>
		  <GroupDivCol>
			<div>
		 	  <GroupTitle>현재 그룹명</GroupTitle>
			  <EmptyBox style={{height:"3.3rem"}}/>
				<Input
					width="386px"
					height="30px"
					size="386px"					
					placeHolder=" Group1"//추후 설정을누른 그룹의 이름을 받아오는 로직으로 변경필요
					fontSize={2}
					onChange={handleInputChange}
				/>
			<GroupDescription>그룹명을 변경 하시려면 수정을 클릭해주세요. </GroupDescription>
			<EmptyBox style={{height:"3.8rem"}}/>
			<GroupTitle>친구 초대</GroupTitle>
			<EmptyBox style={{height:"1.8rem"}}/>
			<Input
				width="300px"//투명박스 px
				height="30px"//투명박스px
				size="386px" //가로길이 px
				placeHolder=" 이메일을 입력해주세요"
				fontSize={1.6} //인풋에쓰여지는 텍스트싸이즈
				onChange={handleInputChange}
			/>
			<EmptyBox style={{height:"0.6rem"}}/>

			<GroupInviteList>초대될친구 리스트 보여줄 부분</GroupInviteList>
		  </div>

			<GroupDivRow>
				<Button
				label="그룹삭제" // 버튼 Text 지정 가능
				size="small" // 버튼 사이즈
				onClick={ handleSubmitCancle} // onClick
				fontcolor={"var(--color-white)"} // 폰트 색 변경
				background-color={"var(--color-blue-03)"} // 폰트 색 변경
				/>
				<Button
				label="저장하기" // 버튼 Text 지정 가능
				size="small" // 버튼 사이즈
				onClick={handleSubmitSave} // onClick				
				fontcolor={"var(--color-white)"} // 폰트 색 변경

				/>
			</GroupDivRow>
		  </GroupDivCol>
		</GroupWapper>
	);
}

const GroupInviteList=styled.div`
	display:flex;
	width : 100%;
`
const EmptyBox=styled.div`
	display:flex;
	width : 100%;
`
const GroupDescription=styled.div`
	display:flex;
	flex-direction : column;
	color: var(--color-gray-05);
  font-size: 1.3rem;
  justify-self: center;
`
const GroupTitle=styled.div`
	display:flex;
	flex-direction : column;
	color: var(--color-gray-06);
  font-size: 2rem;
  justify-self: center;
`

const GroupDivCol=styled.div`
	display:flex;
	flex-direction : column;
	justify-content : space-between;
	width : 38.6rem;
	border : solid red 5px;

	
`
const GroupDivRow=styled.div`
	display:flex;
	flex-direction : row;
	justify-content : space-between;

	
`

const GroupWapper=styled.div`
	display:flex;
	height: 54.4rem;
	justify-content : center;
`	
//align-items: center;
 

	
export default GroupEdit;