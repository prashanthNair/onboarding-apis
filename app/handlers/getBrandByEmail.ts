import middy from "@middy/core";
import cors from "@middy/http-cors";
import { getBrandDetailsByEmail } from "../services/getBrandByEmail";
import createError from "http-errors";

const getBrandByEmail = async (event: any) => {
  
  if (event.pathParameters == null) {
    return new createError.NotFound("input error");
  }
const params = event.pathParameters.EmailId

let response = await getBrandDetailsByEmail(params);

return {
  statusCode: 200,
  body: JSON.stringify(response),
};

};
export const handler = middy(getBrandByEmail).use(cors())