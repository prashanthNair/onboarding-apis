import { documentClient, dynamoDB } from "../utils/config";
import { BrandTable } from "../utils/constants";
import createError from "http-errors";

export const editBrand = async (brandRequest: any) => {
  try {
    const params = {
      TableName: BrandTable,
      Key: {
        BrandId: brandRequest.BrandId,
        Category: brandRequest.Category,
      },
      ExpressionAttributeNames: {
        "#MobileNumber": "MobileNumber",
        "#brandname": "BrandName",
        "#country": "Country",
        "#countrycode": "CountryCode",
        "#emailid": "EmailId",
        "#lastupdateddate": "UpdatedAt"
      },
      ExpressionAttributeValues: {
        ":MobileNumber": brandRequest.MobileNumber,
        ":BrandName": brandRequest.BrandName,
        ":Country": brandRequest.Country,
        ":CountryCode": brandRequest.CountryCode,
        ":EmailId": brandRequest.EmailId,
        ":UpdatedAt": brandRequest.UpdatedAt,
      },
      UpdateExpression: "SET #MobileNumber = :MobileNumber, #brandname = :BrandName , #country = :Country, #countrycode = :CountryCode, #emailid = :EmailId , #lastupdateddate = :UpdatedAt ",
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
