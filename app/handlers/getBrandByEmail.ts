import middy from "@middy/core";
import cors from "@middy/http-cors";
import { getBrandDetailsByEmail } from "../services/viewBrandByEmail";
import createError from "http-errors";
import { ValidateHeader, MakeHeaderRequest } from "../utils/commonMidleware";

const getBrandByEmail = async (event: any) => {
  let validateResponse = ValidateHeader(event["headers"]);
  if (!validateResponse.Status) {
    return {
      statusCode: 200,
      body: JSON.stringify(validateResponse),
    };
  }
  const headerRequest = MakeHeaderRequest(event["headers"]);

  console.log("Header", headerRequest);

  if (!event.pathParameters) {
    const err = new createError.NotFound("Bad Input");
    return {
      statusCode: 400,
      body: JSON.stringify(err),
    };
  }

  const params = event.pathParameters.EmailId;
  let response = await getBrandDetailsByEmail(params);

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
export const handler = middy(getBrandByEmail).use(cors());
