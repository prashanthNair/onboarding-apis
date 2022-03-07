import middy from "@middy/core";
import cors from "@middy/http-cors";
import { BrandModel } from "../model/brandModel";
import { editBusinessDetails } from "../services/editBusinessDetails";
import createError from "http-errors";

const updateBusinessDetails = async (event: any) => {

  if (event.body == null && event.pathParameters == null) {
    return new createError.NotFound("input error");
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
};
export const handler = middy(updateBusinessDetails).use(cors());
