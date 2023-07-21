import { useQuery } from "react-query";

export const request = async ({ requestFn }) => {
  try {
    const res = await requestFn();
    return res.data;
  } catch (error) {
    throw error;
  }
};

const useQueryFn = (querys, requestFn, options = {}) => {
  const queryKey = Array.isArray(querys) ? querys[0] : querys;
  const { data, error, isLoading, ...props } = useQuery(
    queryKey,
    () => request({ requestFn }),
    {
      ...options,
      enabled: !!querys,
    }
  );

  return {
    ...props,
    data,
    error,
    isLoading,
  };
};

export default useQueryFn;
