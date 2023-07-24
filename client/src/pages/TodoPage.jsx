import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Loading from "../components/Loading/Loading";
import TodoGroup from "../feature/Todo/TodoGroup";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import useQueryTodoGroup from "../query/todogroup.query";
import TodoList from "../feature/Todo/TodoList";
import Button from "../components/Button/Button";

const TodoPage = () => {
	const { groupId } = useParams();
	const [startDate, setStartDate] = useState(
		dayjs().locale("ko").startOf("week").add(1, "day")
	);

	const navigate = useNavigate();

	const { isLoading, data } = useQueryTodoGroup({ groupId });

	if (isLoading)
		return (
			<StyledWrapper>
				<Loading />
			</StyledWrapper>
		);
	else if (!data?.groupInfo)
		return (
			<StyledWrapper
				style={{
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div className="todo-empty-text">존재하지 않는 TODO 그룹입니다</div>
				<Button
					onClick={() => navigate("/")}
					label="Main으로 돌아가기"
					size="medium"
					style={{
						backgroundColor: "var(--color-blue-03)",
						width: "max-content",
						padding: "0 2rem",
					}}
				/>
			</StyledWrapper>
		);

	const { groupInfo, members } = data;
	return (
		<StyledWrapper>
			<TodoGroup
				groupInfo={groupInfo}
				members={members}
				setStartDate={setStartDate}
			/>
			<TodoList groupInfo={groupInfo} startDate={startDate} />
		</StyledWrapper>
	);
};

export default TodoPage;

const StyledWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	position: relative;

	.todo-empty-text {
		font-size: 2.4rem;
		margin-bottom: 4rem;
	}
`;
