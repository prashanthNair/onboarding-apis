import middy from "@middy/core";
import cors from "@middy/http-cors";
import { BrandModel } from "../model/brandModel";
import { editBankDetails } from "../services/editBankDetails";
import createError from "http-errors";
import { ValidateHeader, MakeHeaderRequest } from "../utils/commonMiddleware";

const updateBandDetails = async (event: any) => {
  try {
    console.info(
      `Request Body: ${JSON.stringify(
        event.body
      )} Method: Update Action:updateBandDetails `
    );
    let validateResponse = ValidateHeader(event["headers"]);
    if (!validateResponse.Status) {
      return {
        statusCode: 200,
        body: JSON.stringify(validateResponse),
      };
    }
    const headerRequest = MakeHeaderRequest(event["headers"]);

    console.log("Header", headerRequest);

    if (!event.body || !event.pathParameters) {
      const err = new createError.NotFound("Bad Input");
      return {
        statusCode: 400,
        body: JSON.stringify(err),
      };
    }
    let brandModel: BrandModel = JSON.parse(event.body);
    const now = new Date();
    let BrandId = event.pathParameters.BrandId;

    const brandrequest = {
      BrandId: BrandId,
      Category: brandModel.Category ? brandModel.Category : "All",
      AccountHolderName: brandModel.BankDetails.AccountHolderName,
      BeneficiaryName: brandModel.BankDetails.BeneficiaryName,
      AccountNumber: brandModel.BankDetails.AccountNumber,
      BranchIFCCode: brandModel.BankDetails.BranchIFCCode,
      UpdatedAt: now.toLocaleString(),
    };

    let response = await editBankDetails(brandrequest);

    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(response),
      }} Method: POST Action: UpdateBandDetails `
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
export const handler = middy(updateBandDetails).use(cors());
