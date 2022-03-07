import middy from "@middy/core";
import cors from "@middy/http-cors";
import { getBrandDetails } from "../services/getBrand";
import createError from "http-errors";

const getBrand = async (event: any) => {
  
  if (event.pathParameters == null) {
    return new createError.NotFound("input error");
  }

const params = event.pathParameters.BrandId
let response = await getBrandDetails(params);

return {
  statusCode: 200,
  body: JSON.stringify(response),
};

};
export const handler = middy(getBrand).use(cors())