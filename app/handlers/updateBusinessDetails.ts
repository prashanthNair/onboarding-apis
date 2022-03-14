import middy from "@middy/core";
import cors from "@middy/http-cors";
import { BrandModel } from "../model/brandModel";
import { editBusinessDetails } from "../services/editBusinessDetails";
import createError from "http-errors";
import { ValidateHeader, MakeHeaderRequest } from "../utils/commonMidleware";

const updateBusinessDetails = async (event: any) => {
  try {
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
      const err = new createError.NotFound("Bad Input");
      return {
        statusCode: 400,
        body: JSON.stringify(err),
      };
    }
    let BrandId = event.pathParameters.BrandId;
    let brandModel: BrandModel = JSON.parse(event.body);
    const now = new Date();

    const brandrequest = {
      BrandId: BrandId,
      Category: brandModel.Category ? brandModel.Category : "All",
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
    let response = await editBusinessDetails(brandrequest);
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
