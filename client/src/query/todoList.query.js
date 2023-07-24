import { useQuery } from "react-query";
import { readTodoList } from "../api/todogroups.api";

export const request = async ({ groupId, startDate, endDate }) => {
  try {
    const todoList = await readTodoList(groupId, startDate, endDate);
    return todoList.filter(
      (item) =>
        item.todo_schedule_date >= startDate &&
        item.todo_schedule_date <= endDate
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const useQueryTodoList = ({ groupId, startDate, endDate }, options = {}) => {
  const { data, error, isLoading, ...props } = useQuery(
    ["todoList", groupId, startDate, endDate],
    () => request({ groupId, startDate, endDate }),
    {
      ...options,
      enabled: !!groupId,
      staleTime: 300000,
    }
  );

  return {
    ...props,
    data,
    error,
    isLoading,
  };
};

export default useQueryTodoList;
