import middy from "@middy/core";
import { BrandUpdateModel } from "../model/brandUpdateModel";
import { editBrand } from "../services/editBrand";
import { BrandTable } from "../utils/constants"; 


const updateBrand = async (event: any, context: any) => {
  let brandUpdateModel: BrandUpdateModel = JSON.parse(event.body);
  const now = new Date().toISOString();

  const brandrequest = {
    TableName: BrandTable,
    Key: {
      BrandId: brandUpdateModel.BrandId,
      Category: brandUpdateModel.Category,
    },
    ExpressionAttributeNames: {
      "#MobileNumber": "MobileNumber",
    },
    ExpressionAttributeValues: {
      ":MobileNumber": brandUpdateModel.MobileNumber,
    },
    UpdateExpression: "SET #MobileNumber = :MobileNumber",
    ReturnValues: "ALL_NEW",
  };
  let response = await editBrand(brandrequest);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };

};
export const handler = middy(updateBrand);