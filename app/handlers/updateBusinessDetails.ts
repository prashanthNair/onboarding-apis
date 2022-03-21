import middy from "@middy/core";
import cors from "@middy/http-cors";
import { BrandModel } from "../model/brandModel";
import { editBusinessDetails } from "../services/editBusinessDetails";
import createError from "http-errors";
import { ValidateHeader, MakeHeaderRequest } from "../utils/commonMiddleware";

const updateBusinessDetails = async (event: any) => {
  try {
    console.info(
      `Request Body: ${JSON.stringify(
        event.body
      )} Method: Update Action:UpdateBusinessDetails `
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

    if (!event.body || !event.pathParameters) {
      const err = new createError.NotFound("Body or pathParameters missing");
      return {
        statusCode: 400,
        body: JSON.stringify(err),
      };
    }
    let EmailId = event.pathParameters.EmailId;
    let brandModel: BrandModel = JSON.parse(event.body);
    const now = new Date();

    const brandrequest = {
      EmailId: EmailId,
      BrandId: brandModel.BrandId,
      PAN: brandModel.PAN,
      RegBusinessName: brandModel.RegBusinessName,
      RegisteredType: brandModel.RegisteredType,
      PANOwnerName: brandModel.PANOwnerName,
      BillingName: brandModel.BillingName,
      Street: brandModel.Address.Street,
      PostalCode: brandModel.Address.PostalCode,
      City: brandModel.Address.City,
      States: brandModel.Address.States,
      UpdatedAt: now.toLocaleString(),
    };
    if (!brandrequest.EmailId || !brandrequest.BrandId) {
      const err = new createError.NotFound("Email Id and Brand Id required");
      return {
        statusCode: 400,
        body: JSON.stringify(err),
      };
    }
    let response = await editBusinessDetails(brandrequest);
    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(response),
      }} Method: POST Action: UpdateBusinessDetails `
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
export const handler = middy(updateBusinessDetails).use(cors());
