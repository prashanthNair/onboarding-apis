import middy from "@middy/core";
import cors from "@middy/http-cors";
import { BrandModel } from "../model/brandModel";
import createError from "http-errors";
import { ValidateHeader, MakeHeaderRequest } from "../utils/commonMiddleware";
import { Create } from "../utils/modelFactory";
import { CreateBrand } from "../services/createBrand";

const createBrand = async (event: any) => {
  try {
    console.info(
      `Request Body: ${JSON.stringify(
        event.body
      )} Method: POST Action:createBrand `
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

    if (!event.body) {
      const err = new createError.NotFound("Body Missing");
      return {
        statusCode: 200,
        body: JSON.stringify(err),
      };
    }

    let brandModel: BrandModel = JSON.parse(event.body);
    let brandRequest = Create(brandModel);

    if (brandRequest.EmailId == null || brandRequest.Password == null) {
      const err = new createError.NotFound("Email Id and Password required");
      return {
        statusCode: 200,
        body: JSON.stringify(err),
      };
    }

    let response = await CreateBrand(headerRequest, brandRequest);

    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(response),
      }} Method: POST Action:createBrand `
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

export const handler = middy(createBrand).use(cors());
