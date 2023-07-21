import { useQuery } from "react-query";
import { readAllTodoGroups } from "../api/todogroups.api";

export const request = async () => {
  try {
    const todoGroupList = await readAllTodoGroups();
    return todoGroupList;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const useQueryTodoGroupList = (options = {}) => {
  const { data, error, isLoading, ...props } = useQuery(
    ["todoGroupList"],
    () => request(),
    {
      ...options,
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

export default useQueryTodoGroupList;
