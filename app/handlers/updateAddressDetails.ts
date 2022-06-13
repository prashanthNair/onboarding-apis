import createError from 'http-errors';
import { AddressDetails } from '../model/brandModel';
import { editAddressDetails } from '../services/editAddressDetails';
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
      )} Method: Update Action:updateAddressDetails `
    );
    let validateResponse = ValidateHeader(event['headers']);
    if (!validateResponse.Status) {
      return responseBuilder(validateResponse, 400);
    }
    const headerRequest = MakeHeaderRequest(event['headers']);

    console.log('Header', headerRequest);

    if (!event.body || !event.pathParameters) {
      const err = new createError.NotFound('Body or pathParameters missing');
      return responseBuilder(err, 400);
    }
    let emailId = event.pathParameters.EmailId;
    let requestModel: any = JSON.parse(event.body);
    const billingDetails: AddressDetails = {
      BillingAddress: requestModel.BillingAddress,
      ShippingAddress: requestModel.ShippingAddress,
      Logo: requestModel.Logo,
      Signature: requestModel.Signature,
    };

    if (!emailId || !requestModel.BrandId) {
      const err = new createError.NotFound('Email Id and Brand Id required');
      return responseBuilder(err, 400);
    }
    let response = await editAddressDetails(
      billingDetails,
      emailId,
      requestModel.BrandId
    );
    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(response),
      }} Method: POST Action: updateAddressDetails `
    );
    return responseBuilder(response, 200);
  } catch (error: any) {
    console.error(error);
    return responseBuilder(error, 500);
  }
};
