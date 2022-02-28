import { documentClient } from "../utils/config";
import { BrandTable } from "../utils/constants";
import createError from "http-errors";

export const editBusinessDetails = async (brandRequest: any) => {
  try {
    const params = {
      TableName: BrandTable,
      Key: {
        BrandId: brandRequest.BrandId,
        Category: brandRequest.Category,
      },
      ExpressionAttributeNames: {
        "#PAN": "PAN",
        "#RegBusinessName": "RegBusinessName",
        "#RegisteredType": "RegisteredType",
        "#PANOwnerName": "PANOwnerName",
        "#BillingName": "BillingName",
        "#UpdatedDate": "UpdatedDate",
      },
      ExpressionAttributeValues: {
        ":PAN": brandRequest.PAN,
        ":RegBusinessName": brandRequest.RegBusinessName,
        ":RegisteredType": brandRequest.RegisteredType,
        ":PANOwnerName": brandRequest.PANOwnerName,
        ":BillingName": brandRequest.BillingName,
        ":Street": brandRequest.Street,
        ":PostalCode": brandRequest.PostalCode,
        ":City": brandRequest.City,
        ":States": brandRequest.States,
        ":UpdatedDate": brandRequest.UpdatedDate,
      },
      UpdateExpression:
        "SET #PAN = :PAN, #RegBusinessName = :RegBusinessName, #PANOwnerName = :PANOwnerName, #BillingName = :BillingName, Address.Street = :Street, Address.PostalCode = :PostalCode, Address.City = :City, Address.States = :States, #RegisteredType = :RegisteredType,  #UpdatedDate = :UpdatedDate",
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
