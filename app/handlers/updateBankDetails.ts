import middy from "@middy/core";
import cors from "@middy/http-cors";
import { BrandUpdateModel } from "../model/brandUpdateModel";
import { editBankDetails } from "../services/editBankDetails";



const updateBandDetails = async (event: any, context: any) => {
  let brandUpdateModel: BrandUpdateModel = JSON.parse(event.body);
  const now = new Date().toISOString();
  let BrandId=event.pathParameters.BrandId
  const brandrequest = {
    BrandId:BrandId,
    Category: brandUpdateModel.Category?brandUpdateModel.Category:"All",
    
    AccountHolderame:brandUpdateModel.BankDetails.AccountHolderame,
    BeneficiaryName:brandUpdateModel.BankDetails.BeneficiaryName,
    AccountNumber:brandUpdateModel.BankDetails.AccountNumber,
    BranchIfscCode:brandUpdateModel.BankDetails.BranchIfscCode,
    UpdatedAt:now
  }
  let resp=brandrequest
  let response = await editBankDetails(brandrequest);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };

};
export const handler = middy(updateBandDetails).use(cors())