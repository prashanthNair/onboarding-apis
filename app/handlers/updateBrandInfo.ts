import middy from "@middy/core";
import cors from "@middy/http-cors";
import { BrandModel } from "../model/brandModel";
import { editBrandPersonalInfo } from "../services/editBrandInfo";
import createError from "http-errors";
import { ValidateHeader, MakeHeaderRequest } from "../utils/commonMidleware";

const updateBrandContact = async (event: any) => {
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

    let brandModel: BrandModel = JSON.parse(event.body);
    let BrandId = event.pathParameters.BrandId;
    const now = new Date();

    const brandrequest = {
      BrandId: BrandId,
      Category: brandModel.Category ? brandModel.Category : "All",
      Name: brandModel.Name,
      Mobile: brandModel.Mobile,
      CountryCode: brandModel.CountryCode ? brandModel.CountryCode : "+91",
      BrandName: brandModel.BrandName,
      GSTN: brandModel.GSTN,
      Country: brandModel.Country,
      BrandUrl: brandModel.BrandUrl,
      Tags: brandModel.Tags,
      Website: brandModel.Website,
      Password: brandModel.Password,
      UpdatedAt: now.toLocaleString(),
    };
    let response = await editBrandPersonalInfo(brandrequest);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  
};
export const handler = middy(updateBrandContact).use(cors());
