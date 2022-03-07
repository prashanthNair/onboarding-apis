import middy from "@middy/core";
import cors from "@middy/http-cors";
import { BrandModel } from "../model/brandModel";
import { editBankDetails } from "../services/editBankDetails";
import createError from "http-errors";

const updateBandDetails = async (event: any) => {
    if (event.body == null && event.pathParameters == null) {
      return new createError.NotFound("input error");
    }

  let brandModel: BrandModel = JSON.parse(event.body);
  const now = new Date();
  let BrandId = event.pathParameters.BrandId
  
  const brandrequest = {
    BrandId: BrandId,
    Category: brandModel.Category ? brandModel.Category : "All",
    AccountHolderName: brandModel.BankDetails.AccountHolderName,
    BeneficiaryName: brandModel.BankDetails.BeneficiaryName,
    AccountNumber: brandModel.BankDetails.AccountNumber,
    BranchIFCCode: brandModel.BankDetails.BranchIFCCode,
    UpdatedDate: now.toISOString(),
  };

  let response = await editBankDetails(brandrequest);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };

};
export const handler = middy(updateBandDetails).use(cors())