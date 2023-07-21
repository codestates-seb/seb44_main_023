import { useQuery } from "react-query";
import { readTodoGroup, readTodoGroupMember } from "../api/todogroups.api";

export const request = async ({ groupId }) => {
  try {
    const groupInfo = await readTodoGroup(groupId);
    const members = await readTodoGroupMember(groupId);

    return { groupInfo, members };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const useQueryTodoGroup = ({ groupId }, options = {}) => {
  const { data, error, isLoading, ...props } = useQuery(
    ["todogroup", groupId],
    () => request({ groupId }),
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

export default useQueryTodoGroup;
