import { API } from "./api";

export const readTodoGroup = async () => {
	try {
		const res = await API.get(`/todogroups/`);
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const updateTodoGroup = async (groupId, todo_group_title) => {
	try {
		console.log("groupId!:", groupId);
		console.log("data!:", todo_group_title);

		const res = await API.patch(`/todogroups/${groupId}`, {
			todo_group_title,
		});
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const deleteTodoGroup = async (groupId) => {
	console.log("deleteTodoGroup");
	console.log("deleteTodoGroup : groupId!:", groupId);

	try {
		console.log(" try groupId!:", groupId);

		await API.delete(`/todogroups/${groupId}`);
		console.log("done");
	} catch (err) {
		throw err;
	}
};

export const inviteTodoGroup = async (groupId) => {
	console.log("invite");
	console.log("inviteTodoGroup : groupId!:", groupId);

	try {
		console.log(" try invite!:", groupId);
		await API.post(`/todogroups/${groupId}/invitation`);
		console.log("done");
	} catch (err) {
		throw err;
	}
};
