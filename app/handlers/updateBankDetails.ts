import createError from 'http-errors';
import { BankDetails } from '../model/brandModel';
import { editBankDetails } from '../services/editBankDetails';
import {
  MakeHeaderRequest,
  responseBuilder,
  ValidateHeader,
} from '../utils/helper';

export const handler = async (event: any) => {
  try {
    console.info(
      `Request Body: ${JSON.stringify(
        event.body
      )} Method: Update Action:updateBandDetails `
    );
    let validateResponse = ValidateHeader(event['headers']);
    if (!validateResponse.Status) {
      return {
        statusCode: 200,
        body: JSON.stringify(validateResponse),
      };
    }
    const headerRequest = MakeHeaderRequest(event['headers']);

    console.log('Header', headerRequest);

    if (!event.body || !event.pathParameters) {
      const err = new createError.NotFound('Body or pathParameters missing');
      return {
        statusCode: 400,
        body: JSON.stringify(err),
      };
    }

    let brandModel: any = JSON.parse(event.body);
    let emailId = event.pathParameters.EmailId;

    const brandRequest: BankDetails = {
      BeneficiaryName: brandModel.BeneficiaryName,
      AccountNumber: brandModel.AccountNumber,
      IFSCode: brandModel.IFSCode,
      BankName: brandModel.BankName,
    };
    if (!emailId || !brandModel.BrandId) {
      const err = new createError.NotFound('Email Id and Brand Id required');
      return responseBuilder(err, 400);
    }

    let response = await editBankDetails(
      brandRequest,
      emailId,
      brandModel.BrandId
    );

    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(response),
      }} Method: POST Action: UpdateBandDetails `
    );
    return responseBuilder(response, 200);
  } catch (error: any) {
    console.error(error);
    return responseBuilder(error, 500);
  }
};
