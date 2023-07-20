import { API } from "./api";
import { generateFakeData } from "../feature/Ledger/LedgerList/generateFakeData";

export const readAllLedgerGroups = async () => {
  try {
    const res = await API.get("/ledgergroups");
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const readLedgerGroup = async (groupId) => {
  try {
    const res = await API.get(`/ledgergroups/${groupId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const readLedgerGroupMember = async (groupId) => {
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
    // const res = await API.get(`/ledgergroups/${groupId}/members`);
    // return res.data;
  } catch (err) {
    throw err;
  }
};

export const readLedgerList = async (groupId, startDate, endDate) => {
  try {
    return generateFakeData(100);

    const response = await API.get(`/ledgergroups/${groupId}/ledgers`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const createLedgerGroup = async (memberId, ledgerGroupTitle) => {
  try {
    const res = await API.post("/ledgergroups", {
      member_id: 1,
      ledger_group_title: ledgerGroupTitle,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};
