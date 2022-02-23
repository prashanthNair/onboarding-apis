import { documentClient } from "../utils/config";
import { BrandTable } from "../utils/constants";
import createError from "http-errors";

export const editBankDetails = async (brandRequest: any) => {
  try {
    const params = {
      TableName: BrandTable,
      Key: {
        BrandId: brandRequest.BrandId,
        Category: brandRequest.Category,
      },
      ExpressionAttributeValues: {
        ":BeneficiaryName": brandRequest.BeneficiaryName,
        ":BranchIfscCode": brandRequest.BranchIfscCode,
        ":AccountNumber": brandRequest.AccountNumber,
        ":AccountHolderame": brandRequest.AccountHolderame
      },
      UpdateExpression: "SET BankDetails.BeneficiaryName = :BeneficiaryName ,BankDetails.BranchIfscCode = :BranchIfscCode ,BankDetails.AccountNumber = :AccountNumber ,BankDetails.AccountHolderame = :AccountHolderame ",
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