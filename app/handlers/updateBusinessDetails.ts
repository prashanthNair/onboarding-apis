import createError from 'http-errors';
import { BusinessDetails } from '../model/brandModel';
import { editBusinessDetails } from '../services/editBusinessDetails';
import {
  MakeHeaderRequest,
  responseBuilder,
  ValidateHeader,
} from '../utils/commonMiddleware';

export const handler = async (event: any) => {
  try {
    console.info(
      `Request Body: ${JSON.stringify(
        event.body
      )} Method: Update Action:UpdateBusinessDetails `
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
    let brandModel: any = JSON.parse(event.body);
    const businessDetails: BusinessDetails = {
      BusinessName: brandModel.BusinessName,
      BusinessType: brandModel.BusinessType,
      Category: brandModel.Category,
      SubCategory: brandModel.SubCategory,
      GSTIN: brandModel.GSTIN,
      BusinessPAN: brandModel.BusinessPAN,
      PANOwnerName: brandModel.PANOwnerName,
      BrandName: brandModel.BrandName,
      PinCode: brandModel.PinCode,
      WebSiteLink: brandModel.WebSiteLink,
    };

    if (!emailId || !brandModel.BrandId) {
      const err = new createError.NotFound('Email Id and Brand Id required');
      return responseBuilder(err, 400);
    }
    let response = await editBusinessDetails(
      businessDetails,
      emailId,
      brandModel.BrandId
    );
    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(response),
      }} Method: POST Action: UpdateBusinessDetails `
    );
    return responseBuilder(response, 200);
  } catch (error: any) {
    console.error(error);
    return responseBuilder(error, 500);
  }
};
