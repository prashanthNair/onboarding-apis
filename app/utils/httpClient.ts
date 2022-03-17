import axios from "axios";
import { BASE_URL } from "./constants";
export const SetAsync = () => {};

export const GetAsync = async (method: any) => {
  const url = getUrl(method);
  const result = await axios.get(url);
  return result.data;
};

export const PostUserAsync = async (method, req: any) => {
  const url = getUrl(method);
  const headers = createHeader(req.header);
  try {
    const response = await axios.post(url, req.body, { headers });
    console.log("Create User: response:", {
      message: "Request received",
      url: response.config.url,
      data: response.data,
      status: response.status,
    });
    return makeResponseData(response.data);
  } catch (err) {
    console.error(`Error ${err}`);
  }
};

const makeResponseData = (data) => {
  if (data || data.body) { 
    return { data: data.body };
  } else {
    return {
      data: data.body,
    };
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
    "X-MIBAPI-Trace-Id": req.TraceID,
  };
};
