import createError from 'http-errors';
import { Register } from '../services/registerOjtApplication';
import {
  MakeHeaderRequest,
  responseBuilder,
  ValidateHeader,
} from '../utils/commonMiddleware';

export const handler = async (event: any) => {
  try {
    const applicantId = 'AP' + new Date().getTime().toString();
    console.info(
      `Request Body: ${JSON.stringify(
        event.body
      )} Method: POST Action:createBrand `
    );

    let validateResponse = ValidateHeader(event['headers']);

    if (!validateResponse.Status) {
      return responseBuilder(validateResponse, 400);
    }

    const headerRequest: any = MakeHeaderRequest(event['headers']);
    console.info(
      `Request: Path: ${event.path}, Method:${
        event.httpMethod
      } Headers:${JSON.stringify(event.headers)}, Body:${JSON.stringify(
        event.body
      )} TraceId: ${headerRequest.TraceId}`
    );

    console.log('Header', headerRequest);

    if (!event.body) {
      const err = new createError.NotFound('Body Missing');
      return responseBuilder(err, 400);
    }

    let applicationModel: any = JSON.parse(event.body);
    const now = new Date();
    applicationModel.ID = applicantId;
    applicationModel.Status = 'Active';
    applicationModel.CreatedAt = now.toUTCString();
    applicationModel.UpdatedAt = now.toUTCString();
    let response = await Register(applicationModel);

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
