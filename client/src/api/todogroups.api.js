import { API } from "./api";

export const readAllTodoGroups = async () => {
  try {
    const response = await API.get("/api/todogroups");
    return response.data ?? [];
  } catch (err) {
    throw err;
  }
};