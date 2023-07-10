export const readTodoGroup = async (groupId) => {
  try {
    const res = {
      status: 200,
      data: {
        member_id: 1,
        todo_group_id: 1,
        todo_group_title: "철수의 할 일",
      },
    };

    return res.data;
  } catch (err) {
    console.log(err);
    return [];
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

export const readTodoList = (groupId) => {
  try {
    const res = {
      status: 200,
      data: [
        {
          todo_id: 1,
          todo_title: "집 청소",
          todo_content: "설거지하기시른디",
        },
        {
          todo_id: 2,
          todo_title: "집 청소",
          todo_content: "설거지하기시른디",
          todo_schedule_date: "2023-07-10",
        },
        {
          todo_id: 3,
          todo_title: "집 청소",
          todo_content: "설거지하기시른디",
          todo_schedule_date: "2023-07-10",
        },
        {
          todo_id: 4,
          todo_title: "빨래방 다녀오기",
          todo_content: "빨래하기",
          todo_schedule_date: "2023-07-12",
        },
        {
          todo_id: 5,
          todo_title: "빨래방 다녀오기",
          todo_content: "빨래하기",
          todo_schedule_date: "2023-07-13",
        },
        {
          todo_id: 6,
          todo_title: "빨래방 다녀오기",
          todo_content: "빨래하기",
          todo_schedule_date: "2023-07-13",
        },
      ],
    };
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
