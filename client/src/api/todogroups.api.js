import axios from "axios";

export const readAllTodoGroups = async () => {
  try {
    const response = await axios.get("/api/todogroups");
    return response.data ?? [];
  } catch (err) {
    throw err;
  }
};

export const readTodoGroup = async (groupId) => {
  try {
    const response = await axios.get(`/api/todogroups/${groupId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const readTodoList = async (groupId, startDate, endDate) => {
  try {
    const response = await axios.get(`/api/todogroups/${groupId}/todos`);
    // const response = await axios.get(
    //   `/api/todogroups/${groupId}/todos/dates?startDate=${startDate}&endDate=${endDate}`
    // );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateTodoStatus = async (groupId, todoId, status) => {
  try {
    await axios.patch(`/api/todogroups/${groupId}/todos/${todoId}/status`, {
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

export const createTodo = async (data) => {
  try {
    await axios.post(`/api/todogroups/1/todos`, {
      ...data,
    });
  } catch (err) {
    throw err;
  }
};

export const updateTodo = async (groupId, todoId, data) => {
  try {
    await axios.patch(`/api/todogroups/${groupId}/todos/${todoId}`, {
      ...data,
    });
  } catch (err) {
    throw err;
  }
};

export const readTodo = async (groupId, todoId) => {
  try {
    const res = await axios.get(`/api/todogroups/${groupId}/todos/${todoId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteTodo = async (groupId, todoId) => {
  try {
    await axios.delete(`/api/todogroups/${groupId}/todos/${todoId}`);
  } catch (err) {
    throw err;
  }
};

export const readTodoComment = async (groupId, todoId) => {
  try {
    const res = await axios.get(
      `/api/todogroups/${groupId}/todos/${todoId}/comments`
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
    await axios.post(`/api/todogroups/${groupId}/todos/${todoId}/comments`, {
      member_id,
      comment_content: content,
    });
  } catch (err) {
    throw err;
  }
};
