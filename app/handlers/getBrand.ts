import middy from "@middy/core";
import cors from "@middy/http-cors";
import { getBrandDetails } from "../services/viewBrand";
import createError from "http-errors";
import { ValidateHeader, MakeHeaderRequest } from "../utils/commonMiddleware";

const getBrand = async (event: any) => {
  try {
    console.info(
      `Request - Method: Get Action:GetBrand `
    );
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
    let response = await getBrandDetails(params);

    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(response),
      }} Method: POST Action:GetBrand `
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
export const handler = middy(getBrand).use(cors());
