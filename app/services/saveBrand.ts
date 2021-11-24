import AWS from "aws-sdk";
import createError from "http-errors";
import { documentClient } from "../utils/config";
import { BrandTable } from "../utils/constants"; 

export const SaveBrand = async (brandRequest: any) => {
  try {
    let strBody =  JSON.stringify(brandRequest)
    console.info(`Save Brand Begins: String request - ${strBody}`);
    console.info(`Save Brand Begins: Service Table - ${BrandTable}'-'${brandRequest.Categotry}`);
    await documentClient
      .put({
        TableName: BrandTable,
        Item: brandRequest,
      })
      .promise();

    console.info("Save Brand Service End:", brandRequest);
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  return {
    statusCode: 200,
    body: JSON.stringify(brandRequest),
  };
};

export const GetBrand = () => {
  console.info("Get Brand Called");
};
