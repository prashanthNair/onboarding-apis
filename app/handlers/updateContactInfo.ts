import createError from 'http-errors';
import { ContactInfo } from '../model/brandModel';
import { editContactInfo } from '../services/editContactInfo';
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
      )} Method: Update Action:UpdateBrandContact `
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

    let brandModel: any = JSON.parse(event.body);
    let emailId = event.pathParameters.EmailId;
    const brandId = brandModel.BrandId;

    const contactInfo: ContactInfo = {
      Name: brandModel.Name,
      Mobile: brandModel.Mobile,
      EmailId: brandModel.EmailId,
      CountryCode: brandModel.CountryCode ? brandModel.CountryCode : '+91',
      Languages: brandModel.Languages,
    };

    let response = await editContactInfo(contactInfo, emailId, brandId);

    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(response),
      }} Method: POST Action: UpdateBrandContact `
    );
    return responseBuilder(response, 200);
  } catch (error: any) {
    console.error(error);
    return responseBuilder(error, 500);
  }
};
