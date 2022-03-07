import middy from "@middy/core";
import cors from "@middy/http-cors";
import { BrandModel } from "../model/brandModel";
import { editBrandPersonalInfo } from "../services/editBrandInfo";
import createError from "http-errors";

const updateBrandContact = async (event: any) => {
  if (event.body == null && event.pathParameters == null) {
    return new createError.NotFound("input error");
  }

  let brandModel: BrandModel = JSON.parse(event.body);
  let BrandId=event.pathParameters.BrandId
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
    EmailId: brandModel.EmailId,
    UpdatedAt: now.toLocaleString(),
  };
  let response = await editBrandPersonalInfo(brandrequest);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };

};
export const handler = middy(updateBrandContact).use(cors())