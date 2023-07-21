import { useQuery } from "react-query";
import {
  readLedgerGroup,
  readLedgerGroupMember,
} from "../api/ledgergroups.api";

export const request = async ({ groupId }) => {
  try {
    const groupInfo = await readLedgerGroup(groupId);
    const members = await readLedgerGroupMember(groupId);

    return { groupInfo, members };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const useQueryLedgerGroup = ({ groupId }, options = {}) => {
  const { data, error, isLoading, ...props } = useQuery(
    ["ledgergroup", groupId],
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

export default useQueryLedgerGroup;
