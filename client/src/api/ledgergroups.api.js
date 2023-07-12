import { API } from "./api";

export const readLedgerGroups = async () => {
  try {
    return [
      {
        member_id: 1,
        ledger_group_id: 1,
        ledger_group_title: "철수의 소비목록1",
      },
      {
        member_id: 1,
        ledger_group_id: 2,
        ledger_group_title: "철수의 소비목록2",
      },
      {
        member_id: 1,
        ledger_group_id: 3,
        ledger_group_title: "철수의 소비목록3",
      },
      {
        member_id: 1,
        ledger_group_id: 4,
        ledger_group_title: "철수의 소비목록4",
      },
    ];

    const response = API.get("/ledgergroups");
    return response.data;
  } catch (err) {
    throw err;
  }
};
