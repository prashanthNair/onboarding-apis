import { PostAsync } from "../utils/httpClient";

export const createUser = async (method, req) => {
  const res = await PostAsync(method,req);
  return res;
};
