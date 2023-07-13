import { API } from "./api";

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

export const readTodoList = async (groupId) => {
  try {
    const res = await API.get("/api/todos");
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateTodoStatus = async (groupId, todoId, status) => {
  try {
    await API.patch(`/api/todogroups/${groupId}/todos/${todoId}/status`, {
      status,
    });
  } catch (err) {
    throw err;
  }
};
