import { useQuery } from "react-query";
import { readAllLedgerGroups } from "../api/ledgergroups.api";

export const request = async () => {
  try {
    const ledgerGroupList = await readAllLedgerGroups();
    return ledgerGroupList;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const useQueryLedgerGroupList = (options = {}) => {
  const { data, error, isLoading, ...props } = useQuery(
    ["ledgerGroupList"],
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

export default useQueryLedgerGroupList;
