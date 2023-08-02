import { API } from "./api";

export const readAllTodoGroups = async () => {
  try {
    const response = await API.get("/todogroups");
    return response.data ?? [];
  } catch (err) {
    throw err;
  }
};

export const readTodoGroup = async (groupId) => {
  try {
    const response = await API.get(`/todogroups/${groupId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const readTodoList = async (groupId, startDate, endDate) => {
  try {
    const response = await API.get(`/todogroups/${groupId}/todos`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateTodoStatus = async (groupId, todoId, status) => {
  try {
    await API.patch(`/todogroups/${groupId}/todos/${todoId}/status`, {
      status,
    });
  } catch (err) {
    throw err;
  }
};

export const readTodoGroupMember = async (groupId) => {
  try {
    const resData = await API.get(`/todogroups/${groupId}/members`);
    return [
      {
        member_id: resData.data.owner_id,
        profile_image: resData.data.profile_image,
      },
      ...resData.data.invite_members,
    ];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const createTodo = async (groupId, data) => {
  try {
    const res = await API.post(`/todogroups/${groupId}/todos`, {
      ...data,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createTodoGroup = async (memberId, todoGroupTitle) => {
  try {
    const res = await API.post("/todogroups", {
      member_id: 1,
      todo_group_title: todoGroupTitle,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err; // 오류를 상위 호출자에게 다시 던집니다.
  }
};

export const updateTodo = async (groupId, todoId, data) => {
  try {
    const res = await API.patch(`/todogroups/${groupId}/todos/${todoId}`, {
      ...data,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const readTodo = async (groupId, todoId) => {
  try {
    const res = await API.get(`/todogroups/${groupId}/todos/${todoId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteTodo = async (groupId, todoId) => {
  try {
    await API.delete(`/todogroups/${groupId}/todos/${todoId}`);
  } catch (err) {
    throw err;
  }
};

export const readTodoComment = async (groupId, todoId) => {
  try {
    const res = await API.get(
      `/todogroups/${groupId}/todos/${todoId}/comments`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createTodoComment = async (
  groupId,
  todoId,
  member_id,
  content
) => {
  try {
    const res = await API.post(
      `/todogroups/${groupId}/todos/${todoId}/comments`,
      {
        member_id,
        comment_content: content,
      }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
