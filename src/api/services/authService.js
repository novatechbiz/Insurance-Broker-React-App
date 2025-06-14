import axios from "../../utils/axios";

export const loginUser = async (credentials) => {
  const { data } = await axios.post("/login", credentials);
  return data;
};

export const logoutUser = async () => {
  const { data } = await axios.post("/logout");
  return data;
};

export const refreshToken = async () => {
  const { data } = await axios.post("/refresh-token");
  return data;
};
