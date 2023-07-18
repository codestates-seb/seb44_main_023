import axios from "axios";
import { generateFakeData } from "../feature/Ledger/LedgerList/generateFakeData";
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
    const res = generateFakeData(100);
    return res;

    const response = await axios.get(`/api/ledgergroups/${groupId}/ledgers`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
