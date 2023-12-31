import { API } from "./api";

export const addPayments = async (paymentName) => {
  try {
    const response = await API.post("/payments", {
      payment_name: paymentName,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const editPayments = async (paymentId, paymentName) => {
  try {
    const response = await API.patch(`/payments/${paymentId}`, {
      payment_id: paymentId,
      payment_name: paymentName,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deletePayments = async (paymentId) => {
  try {
    const response = await API.delete(`/payments/${paymentId}`, {
      payment_id: paymentId,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const readPayments = async (paymentId) => {
  try {
    const response = await API.get(`/payments/${paymentId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const readAllPayments = async () => {
  try {
    const response = await API.get("/payments");
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
