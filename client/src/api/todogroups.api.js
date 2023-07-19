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
    // const response = await API.get(
    //   `/todogroups/${groupId}/todos/dates?startDate=${startDate}&endDate=${endDate}`
    // );
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
    const res = {
      status: 200,
      data: {
        members: [
          {
            member_id: 1,
            email: "dfek1@gmail.com",
            profile_image:
              "https://i.pinimg.com/474x/df/2d/25/df2d253fbd0eb7d50193f1374128e9f0.jpg",
          },
          {
            member_id: 2,
            email: "sfnjd@gmail.com",
            profile_image:
              "https://i.pinimg.com/474x/df/2d/25/df2d253fbd0eb7d50193f1374128e9f0.jpg",
          },
          {
            member_id: 3,
            email: "njdbkfb@gmail.com",
            profile_image:
              "https://i.pinimg.com/474x/df/2d/25/df2d253fbd0eb7d50193f1374128e9f0.jpg",
          },
        ],
      },
    };

    return res.data;
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
