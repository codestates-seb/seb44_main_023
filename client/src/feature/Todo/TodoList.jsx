import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import TodoDate from "../../components/Todo/TodoDate";
import ButtonFloating from "../../components/Button/ButtonFloating";
import dayjs from "dayjs";
import ModalTodo from "../../components/Todo/ModalTodo/ModalTodo";
import useQueryTodoList from "../../query/todoList.query";
import GroupEdit from "../../components/GroupEdit/GroupEdit";
import { useGroupEditStore } from "../../store/store.groupEdit";
import "../../utils/util";
import { todoMode } from "../../utils/util";

const TodoList = ({ groupInfo, startDate }) => {
	const { groupId } = useParams();
	const { isLoading, data } = useQueryTodoList({
		groupId,
		startDate: startDate
			.clone()
			.startOf("week")
			.add(1, "day")
			.format("YYYY-MM-DD"),
		endDate: startDate.clone().endOf("week").add(1, "day").format("YYYY-MM-DD"),
	});

	if (isLoading) return null;
	return (
		<List
			data={data}
			groupInfo={groupInfo}
			groupId={groupId}
			startDate={startDate}
		/>
	);
};

const List = ({ groupInfo, groupId, data, startDate }) => {
	const [date, setDate] = useState();
	const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
	const [todoList, setTodoList] = useState();

	const handleModalVisible = (date) => async () => {
		await setDate(date);
		setIsCreateModalVisible(!isCreateModalVisible);
	};

	const dateList = [];

	for (let offset = 0; offset < 7; offset++) {
		dateList.push(startDate.clone().add(offset, "day").format("YYYY-MM-DD"));
	}

	useEffect(() => {
		setTodoList(data);
	}, [data]);

	const { todo_group_title } = groupInfo.groupTitle;

	const {
		isModalVisible,
		setMode,
		setIsModalVisible,
		groupTitle,
		setGroupTitle,
	} = useGroupEditStore();
	console.log("TodoList", todo_group_title);

	const handleIsEditModalVisible = () => {
		setIsModalVisible(!isModalVisible);
		setGroupTitle(todo_group_title);
		setMode(todoMode);
		console.log("groupTitle", groupTitle);
		console.log("todoMode", todoMode);
	};

	return (
		<>
			<ModalTodo
				groupId={groupId}
				defaultDate={date}
				isModalVisible={isCreateModalVisible}
				setIsModalVisible={setIsCreateModalVisible}
				setTodoList={setTodoList}
			/>
			<StyledWrapper>
				<TodoDate
					todoList={todoList}
					setTodoList={setTodoList}
					handleModalVisible={handleModalVisible}
					groupId={groupId}
				/>
				{dateList.map((date) => (
					<TodoDate
						groupId={groupId}
						key={`todo-item-${date}`}
						date={date}
						todoList={todoList}
						setTodoList={setTodoList}
						handleModalVisible={handleModalVisible}
					/>
				))}
				<ButtonWrapper>
					<ButtonFloating
						icon="plus"
						onClick={handleModalVisible(dayjs().format("YYYY-MM-DD"))}
					/>
					<ButtonFloating icon="setting" onClick={handleIsEditModalVisible} />
					<GroupEdit />
				</ButtonWrapper>
			</StyledWrapper>
		</>
	);
};

export default TodoList;

const StyledWrapper = styled.div`
	padding: 0 3.2rem 3.2rem;
	width: 100%;
	height: 100%;
	overflow-x: scroll;
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	gap: 2.4rem;
`;

const ButtonWrapper = styled.div`
	position: fixed;
	right: 1.6rem;
	bottom: 1.6rem;
	display: flex;
	gap: 1.2rem;
`;
