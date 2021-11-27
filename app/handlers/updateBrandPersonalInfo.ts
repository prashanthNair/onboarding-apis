import middy from "@middy/core";
import cors from "@middy/http-cors";
import { BrandUpdateModel } from "../model/brandUpdateModel";
import { editBrand } from "../services/editBrandPersonalInfo";



const updateBrandContact = async (event: any, context: any) => {
  let brandUpdateModel: BrandUpdateModel = JSON.parse(event.body);
  const now = new Date().toISOString();
  const brandrequest = {
    BrandId:brandUpdateModel.BrandId,
    Category: brandUpdateModel.Category,
    MobileNumber:brandUpdateModel.MobileNumber,
    CountryCode:brandUpdateModel.CountryCode,
    BrandName:brandUpdateModel.BrandName,
    Country:brandUpdateModel.Country,
    EmailId:brandUpdateModel.EmailId,
    UpdatedAt:now
  }
  let response = await editBrand(brandrequest);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };

};
export const handler = middy(updateBrandContact).use(cors())