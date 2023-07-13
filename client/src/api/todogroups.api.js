import { API } from "./api";

export const readTodoGroups = async () => {
  try {
    const response = API.get("/api/todogroups");
    return response.data ?? [];
  } catch (err) {
    throw err;
  }
};
