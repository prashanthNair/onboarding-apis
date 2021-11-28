import middy from "@middy/core";
import cors from "@middy/http-cors";
import { getBrandDetails } from "../services/getBrand";

const getBrand = async(event:any, context:any)=> {
const params = event.pathParameters.BrandId

let response = await getBrandDetails(params);

return {
  statusCode: 200,
  body: JSON.stringify(response),
};

};
export const handler = middy(getBrand).use(cors())