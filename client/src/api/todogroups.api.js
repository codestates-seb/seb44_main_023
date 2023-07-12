import { API } from "./api";

export const readTodoGroups = async () => {
  try {
    return [
      {
        member_id: 1,
        todo_group_id: 1,
        todo_group_title: "철수의 할 일1",
      },
      {
        member_id: 1,
        todo_group_id: 2,
        todo_group_title: "철수의 할 일2",
      },
      {
        member_id: 1,
        todo_group_id: 3,
        todo_group_title: "철수의 할 일3",
      },
      {
        member_id: 1,
        todo_group_id: 4,
        todo_group_title: "철수의 할 일4",
      },
      {
        member_id: 1,
        todo_group_id: 5,
        todo_group_title: "철수의 할 일5",
      },
    ];

    const response = API.get("/todogroups");
    return response.data;
  } catch (err) {
    throw err;
  }
};
