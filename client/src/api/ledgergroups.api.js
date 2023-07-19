import { API } from "./api";

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
    const res = await API.get(`/ledgergroups/${groupId}/members`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const readLedgerList = async (groupId, startDate, endDate) => {
  try {
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
