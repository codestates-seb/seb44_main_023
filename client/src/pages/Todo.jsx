import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import Loading from "../components/Loading/Loading";
import TodoGroup from "../feature/Todo/TodoGroup";
import TodoList from "../feature/Todo/TodoList";

const TodoPage = () => {
  const { groupId } = useParams();
  const [groupInfo, setGroupInfo] = useState();
  const [todoList, setTodoList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const requestGroupInfo = async () => {
    try {
      const res = {
        status: 200,
        data: {
          members: [
            {
              member_id: 1,
              member_profile_image:
                "https://i.pinimg.com/474x/df/2d/25/df2d253fbd0eb7d50193f1374128e9f0.jpg",
            },
            {
              member_id: 2,
              member_profile_image:
                "https://i.pinimg.com/474x/df/2d/25/df2d253fbd0eb7d50193f1374128e9f0.jpg",
            },
          ],
          todo_group_id: 1,
          todo_group_title: "철수의 할 일",
        },
      };
      if (res.status !== 200) throw res;
      setGroupInfo(res.data);
    } catch (err) {}
  };

  const requestTodoList = async () => {
    try {
      const res = {
        status: 200,
        data: [
          {
            todo_id: 1,
            todo_title: "집 청소",
            todo_content: "설거지하기시른디",
            todo_schedule_date: "yyyy-MM-dd",
          },
        ],
      };
      if (res.status !== 200) throw res;
      setTodoList(res.data);
      setIsLoading(false);
    } catch (err) {}
  };

  useEffect(() => {
    requestGroupInfo();
    requestTodoList();
  }, []);

  return (
    <StyledWrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <TodoGroup groupInfo={groupInfo} />
          <TodoList />
        </>
      )}
    </StyledWrapper>
  );
};

export default TodoPage;

const StyledWrapper = styled.div``;
