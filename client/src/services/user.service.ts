import axios from "axios";

export const findAll = async () => {
  const { data } = await axios.get("http://127.0.0.1:3000/users");
  return data;
};
