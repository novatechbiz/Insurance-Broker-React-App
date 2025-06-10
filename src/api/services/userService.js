import axios from "../../utils/axios";

export const getAllUsers = async () => {
  const { data } = await axios.get("/users");
  return data;
};

export const getUser = async (id) => {
  const { data } = await axios.get(`/users/${id}`);
  return data;
};
