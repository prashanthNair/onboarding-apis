import middy from '@middy/core';
import cors from '@middy/http-cors';
import createError from 'http-errors';
import { BrandModel } from '../model/brandModel';
import { editBrandPersonalInfo } from '../services/editBrandInfo';
import { MakeHeaderRequest, ValidateHeader } from '../utils/commonMiddleware';

const updateBrandContact = async (event: any) => {
  try {
    console.info(
      `Request Body: ${JSON.stringify(
        event.body
      )} Method: Update Action:UpdateBrandContact `
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

    let brandModel: BrandModel = JSON.parse(event.body);
    let EmailId = event.pathParameters.EmailId;
    const now = new Date();

    const brandrequest = {
      EmailId: EmailId,
      BrandId: brandModel.BrandId,
      Name: brandModel.Name,
      Mobile: brandModel.Mobile,
      CountryCode: brandModel.CountryCode ? brandModel.CountryCode : '+91',
      BrandName: brandModel.BrandName,
      GSTN: brandModel.GSTN,
      Country: brandModel.Country,
      BrandUrl: brandModel.BrandUrl,
      Tags: brandModel.Tags,
      Website: brandModel.Website,
      Password: brandModel.Password,
      UpdatedAt: now.toLocaleString(),
    };
    if (!brandrequest.EmailId || !brandrequest.BrandId) {
      const err = new createError.NotFound('Email Id and Brand Id required');
      return {
        statusCode: 400,
        body: JSON.stringify(err),
      };
    }
    let response = await editBrandPersonalInfo(brandrequest);
    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(response),
      }} Method: POST Action: UpdateBrandContact `
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
export const handler = middy(updateBrandContact).use(cors());
