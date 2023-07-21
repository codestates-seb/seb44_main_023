import { useQuery } from "react-query";
import { readLedgerList } from "../api/ledgergroups.api";

export const request = async ({ groupId, startDate, endDate }) => {
  try {
    const ledgerList = await readLedgerList(groupId, startDate, endDate);
    return ledgerList;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const useQueryLedgerList = ({ groupId, startDate, endDate }, options = {}) => {
  const { data, error, isLoading, ...props } = useQuery(
    ["ledgerList", groupId, startDate, endDate],
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

export default useQueryLedgerList;
