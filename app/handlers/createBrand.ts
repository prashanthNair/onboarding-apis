import createError from 'http-errors';
import { BrandModel } from '../model/brandModel';
import { CreateBrand } from '../services/createBrand';
import {
  MakeHeaderRequest,
  responseBuilder,
  ValidateHeader,
  validatemail,
} from '../utils/commonMiddleware';
import { Create } from '../utils/modelFactory';

export const handler = async (event: any) => {
  try {
    console.info(
      `Request Body: ${JSON.stringify(
        event.body
      )} Method: POST Action:createBrand `
    );

    let validateResponse = ValidateHeader(event['headers']);

    if (!validateResponse.Status) {
      return responseBuilder(validateResponse, 400);
    }

    const headerRequest = MakeHeaderRequest(event['headers']);

    console.log('Header', headerRequest);

    if (!event.body) {
      const err = new createError.NotFound('Body Missing');
      return responseBuilder(err, 400);
    }

    let brandModel: BrandModel = JSON.parse(event.body);
    let brandRequest = Create(brandModel);
    if (brandRequest.EmailId == null || brandRequest.Password == null) {
      const err = new createError.NotFound('Email Id and Password required');
      return responseBuilder(err, 400);
    }
    let request = validatemail(brandRequest);
    if ((await request) == true) {
      const err = new createError.NotFound('Email Id already exists');
      return responseBuilder(err, 400);
    }

    let response = await CreateBrand(headerRequest, brandRequest);

    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(response),
      }} Method: POST Action:createBrand `
    );
    return responseBuilder(response, 200);
  } catch (error: any) {
    console.info(
      `Error: Path: ${event.path}, Method:${
        event.httpMethod
      } Error:${JSON.stringify(error)}`
    );
    return responseBuilder(error, 500);
  }
};
