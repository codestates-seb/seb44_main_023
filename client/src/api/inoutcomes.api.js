import { API } from "./api";

export const readInOutcomes = async (inOutcomeId) => {
  try {
    const response = await API.get(`/payments/${inOutcomeId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const readAllInOutcomes = async () => {
  try {
    const response = await API.get(`/inoutcomes`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};