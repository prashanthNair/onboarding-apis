import createError from 'http-errors';
import { DocumentModel } from '../model/brandModel';
import { editDocuments } from '../services/editDocuments';
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
      )} Method: Update Action:UpdateDocuments `
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

    let documents: DocumentModel = JSON.parse(event.body);
    let emailId = event.pathParameters.EmailId;
    const brandId = documents.BrandId;

    let response = await editDocuments(documents, emailId, brandId);

    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(response),
      }} Method: POST Action: UpdateDocuments `
    );
    return responseBuilder(response, 200);
  } catch (error: any) {
    console.error(error);
    return responseBuilder(error, 500);
  }
};
