import middy from "@middy/core";
import cors from "@middy/http-cors";
import { BrandUpdateModel } from "../model/brandUpdateModel";
import { editBrandGst } from "../services/editBrandGst";



const updateBrandGst = async (event: any, context: any) => {
  let brandUpdateModel: BrandUpdateModel = JSON.parse(event.body);
  const now = new Date().toISOString();
  const brandrequest = {
    BrandId:brandUpdateModel.BrandId,
    Category: brandUpdateModel.Category,
    GST:brandUpdateModel.GST,
    UpdatedAt:now
  }
  let response = await editBrandGst(brandrequest);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };

};
export const handler = middy(updateBrandGst).use(cors())