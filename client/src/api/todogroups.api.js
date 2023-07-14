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

export const readTodoList = async (groupId) => {
  try {
    const response = await axios.get(`/api/todogroups/${groupId}/todos`);
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

export const createTodo = async () => {
  try {
    await axios.post(`/api/todogroups/1/todos`, {
      member_id: 2,
      todo_title: "청소",
      todo_content: "빨래하고 설거지",
      todo_schedule_date: "2023-07-10",
    });
  } catch (err) {}
};
