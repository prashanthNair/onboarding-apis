import axios from "axios";
import { BASE_URL } from "./constants";
export const SetAsync = () => {};

export const GetAsync = async (method: any) => {
  const url = getUrl(method);
  const result = await axios.get(url);
  return result.data;
};

export const PostAsync = async (method, req: any) => {
  const url = getUrl(method);
  const headers = createHeader(req.header);
  try {
    axios
      .post(url, req.body, { headers })
      .then((res) => {
        console.info(`Response ${JSON.stringify(res) }`);
        return res.data;
      })
      .catch((err) => {
        console.error(`Error ${err}`);
      });
  } catch (err) {
    console.error(`Error ${err}`);
  }
};

const getUrl = (method) => {
  const url = `${BASE_URL}${method}`;
  return url;
};

const createHeader = (req) => {
  return {
    "X-MIBAPI-Token": req.Token,
    "X-MIBAPI-CustomerID": req.CustomerID,
    "X-MIBAPI-CustomerType": req.CustomerType,
    "X-MIBAPI-Source": req.Source,
  };
};
