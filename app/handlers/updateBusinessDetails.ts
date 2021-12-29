import middy from "@middy/core";
import cors from "@middy/http-cors";
import { BrandUpdateModel } from "../model/brandUpdateModel";
import { editBusinessDetails } from "../services/editBusinessDetails";
import createError from "http-errors";

const updateBusinessDetails = async (event: any, context: any) => {
  if (event.body == null) {
    return new createError.NotFound("body missing");
  }
  let brandUpdateModel: BrandUpdateModel = JSON.parse(event.body);
  const now = new Date().toISOString();
  const brandrequest = {
    BrandId: brandUpdateModel.BrandId,
    Category: brandUpdateModel.Category ? brandUpdateModel.Category : "All",
    PAN: brandUpdateModel.PAN,
    RegBusinessName: brandUpdateModel.RegBusinessName,
    PANOwnerName: brandUpdateModel.PANOwnerName,
    BillingName: brandUpdateModel.BillingName,
    Street: brandUpdateModel.Address.Street,
    PostalCode: brandUpdateModel.Address.PostalCode,
    City: brandUpdateModel.Address.City,
    States: brandUpdateModel.Address.States,
    UpdatedAt: now,
  };
  let response = await editBusinessDetails(brandrequest);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
export const handler = middy(updateBusinessDetails).use(cors());
