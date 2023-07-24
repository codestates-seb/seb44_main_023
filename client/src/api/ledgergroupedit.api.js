import { API } from "./api";

export const readLedgerGroups = async () => {
	try {
		const res = await API.get(`/ledgergroups`);
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const updateLedgerGroup = async (
	memberId,
	groupId,
	ledger_group_title
) => {
	try {
		console.log("groupId!:", groupId);
		console.log("data!:", ledger_group_title);

		const res = await API.patch(`/ledgergroups/${groupId}`, {
			memberId,
			groupId,
			ledger_group_title,
		});
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const deleteLedgerGroup = async (groupId) => {
	console.log("deleteLedgerGroup");
	console.log("deleteLedgerGroup : groupId!:", groupId);

	try {
		console.log(" try groupId!:", groupId);
		await API.delete(`/ledgergroups/${groupId}`);
		console.log("done");
	} catch (err) {
		throw err;
	}
};

export const inviteLedgerGroup = async (groupId) => {
	console.log("invite");
	console.log("inviteLedgerGroup : groupId!:", groupId);

	try {
		console.log(" try invite!:", groupId);
		await API.post(`/ledgergroups/${groupId}/invitation`);
		console.log("done");
	} catch (err) {
		throw err;
	}
};
