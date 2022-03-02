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
        ":BranchIFCCode": brandRequest.BranchIFCCode,
        ":AccountNumber": brandRequest.AccountNumber,
        ":AccountHolderName": brandRequest.AccountHolderName,
        ":UpdatedAt": brandRequest.UpdatedAt,
      },
      UpdateExpression:
        "SET BankDetails.BeneficiaryName = :BeneficiaryName ,BankDetails.BranchIFCCode = :BranchIFCCode ,BankDetails.AccountNumber = :AccountNumber ,BankDetails.AccountHolderName = :AccountHolderName, UpdatedAt = :UpdatedAt",
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