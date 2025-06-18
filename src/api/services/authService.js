import axios from "../../utils/axios";

export const loginUser = async (credentials) => {
  const { data } = await axios.post("/login", credentials);
  return data;
};
