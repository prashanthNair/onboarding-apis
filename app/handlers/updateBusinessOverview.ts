import middy from "@middy/core";
import cors from "@middy/http-cors";
import { BrandUpdateModel } from "../model/brandUpdateModel";
import { editBusinessOverview } from "../services/editBusinessOverview";



const updateBusinessOverviewDetails = async (event: any, context: any) => {
  let brandUpdateModel: BrandUpdateModel = JSON.parse(event.body);
  const now = new Date().toISOString();
  let BrandId=event.pathParameters.BrandId
  const brandrequest = {
    BrandId:BrandId,
    Category: brandUpdateModel.Category?brandUpdateModel.Category:"All",
    BusinessName:brandUpdateModel.BusinessOverview.BusinessName,
    BusinessCategory:brandUpdateModel.BusinessOverview.BusinessCategory,
    BusinessDiscription:brandUpdateModel.BusinessOverview.BusinessDiscription,
    Website:brandUpdateModel.BusinessOverview.Website,
    UpdatedAt:now
  }
  let resp=brandrequest
  let response = await editBusinessOverview(brandrequest);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };

};
export const handler = middy(updateBusinessOverviewDetails).use(cors())
