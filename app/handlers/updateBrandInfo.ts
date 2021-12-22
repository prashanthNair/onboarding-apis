import middy from "@middy/core";
import cors from "@middy/http-cors";
import { BrandUpdateModel } from "../model/brandUpdateModel";
import { editBrandPersonalInfo } from "../services/editBrandInfo";



const updateBrandContact = async (event: any, context: any) => {
  let brandUpdateModel: BrandUpdateModel = JSON.parse(event.body);
  let BrandId=event.pathParameters.BrandId
  const now = new Date().toISOString();
  const brandrequest = {
    BrandId:BrandId,
    Category: brandUpdateModel.Category?brandUpdateModel.Category:"All",
    Name:brandUpdateModel.Name,
    Mobile:brandUpdateModel.Mobile,
    CountryCode:brandUpdateModel.CountryCode?brandUpdateModel.CountryCode:"+91",
    BrandName:brandUpdateModel.BrandName,
    GSTN:brandUpdateModel.GSTN,
    UpdatedAt:now
  }
  let response = await editBrandPersonalInfo(brandrequest);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };

};
export const handler = middy(updateBrandContact).use(cors())