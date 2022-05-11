import createError from 'http-errors';
import { getBrandDetails } from '../services/viewBrand';
import {
  MakeHeaderRequest,
  responseBuilder,
  ValidateHeader,
} from '../utils/helper';

export const handler = async (event: any) => {
  try {
    console.info(`Request - Method: Get Action:GetBrand `);
    let validateResponse = ValidateHeader(event['headers']);
    if (!validateResponse.Status) {
      return responseBuilder(validateResponse, 400);
    }
    const headerRequest = MakeHeaderRequest(event['headers']);
    console.log('Header', headerRequest);

    if (!event.pathParameters) {
      const err = new createError.NotFound('Bad Input');
      return responseBuilder(err, 400);
    }

    const params = event.pathParameters.EmailId;
    let response = await getBrandDetails(params);

    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(response),
      }} Method: POST Action:GetBrand `
    );

    return responseBuilder(response, 200);
  } catch (error: any) {
    console.error(error);
    return responseBuilder(error, 500);
  }
};
