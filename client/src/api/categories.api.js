import { API } from "./api";

export const addCategories = async (categoryName) => {
  try {
    const response = await API.post("/categories", {
      category_name: categoryName,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const editCategories = async (categoryId, categoryName) => {
  try {
    const response = await API.patch(`/categories/${categoryId}`, {
      category_id: categoryId,
      category_name: categoryName,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteCategories = async (categoryId) => {
  try {
    const response = await API.delete(`/categories/${categoryId}`, {
      category_id: categoryId,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const readAllCategories = async () => {
  try {
    const response = await API.get("/categories");
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const readCategories = async (categoryId) => {
  try {
    const response = await API.get(`/categories/${categoryId}`, {
      category_id: categoryId,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
