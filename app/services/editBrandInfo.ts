import { documentClient, dynamoDB } from "../utils/config";
import { BrandTable } from "../utils/constants";
import createError from "http-errors";

export const editBrandPersonalInfo = async (brandRequest: any) => {
  try {
    const params = {
      TableName: BrandTable,
      Key: {
        BrandId: brandRequest.BrandId,
        Category: brandRequest.Category,
      },
      ExpressionAttributeNames: {
        "#Mobile": "Mobile",
        "#brandname": "BrandName",
        "#Name": "Name",
        "#countrycode": "CountryCode",
        "#GSTN": "GSTN",
        "#lastupdateddate": "UpdatedAt"
      },
      ExpressionAttributeValues: {
        ":Mobile": brandRequest.Mobile,
        ":BrandName": brandRequest.BrandName,
        ":Name": brandRequest.Name,
        ":CountryCode": brandRequest.CountryCode,
        ":GSTN": brandRequest.GSTN,
        ":UpdatedAt": brandRequest.UpdatedAt,
      },
      UpdateExpression: "SET #Mobile = :Mobile, #brandname = :BrandName ,#Name = :Name, #countrycode = :CountryCode, #lastupdateddate = :UpdatedAt, #GSTN = :GSTN",
      ReturnValues: "ALL_NEW",
    };

    let strBody = JSON.stringify(brandRequest);
    console.info(`Edit Brand Begins: String request - ${strBody}`);
    console.info(`Edit brand - ${params}`);
    console.info(
      `Edit Brand Begins: Service Table - ${BrandTable}'-'${brandRequest.BrandId}`
    );
    await documentClient.update(params).promise();

    console.info("Edit Brand Service End:", brandRequest);
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  return {
    statusCode: 200,
    body: JSON.stringify(brandRequest),
  };
};
