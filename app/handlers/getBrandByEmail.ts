import middy from "@middy/core";
import cors from "@middy/http-cors";
import { getBrandDetailsByEmail } from "../services/getBrandByEmail";

const getBrandByEmail = async(event:any, context:any)=> {
const params = event.pathParameters.EmailId

let response = await getBrandDetailsByEmail(params);

return {
  statusCode: 200,
  body: JSON.stringify(response),
};

};
export const handler = middy(getBrandByEmail).use(cors())