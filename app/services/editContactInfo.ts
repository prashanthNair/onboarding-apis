import { documentClient } from '../utils/config';
import { BrandTable } from '../utils/constants';
import createError from 'http-errors';

export const editContactInfo = async (
  contactDetails: any,
  emailId,
  brandId
) => {
  try {
    const now = new Date();
    const params = {
      TableName: BrandTable,
      Key: {
        EmailId: emailId,
        BrandId: brandId,
      },
      ExpressionAttributeNames: {
        '#ContactDetails': 'ContactDetails',
        '#UpdatedAt': 'UpdatedAt',
      },
      ExpressionAttributeValues: {
        ':ContactDetails': contactDetails,
        ':UpdatedAt': now.toUTCString(),
      },
      UpdateExpression:
        'SET #ContactDetails = :ContactDetails, #UpdatedAt = :UpdatedAt',
      ReturnValues: 'ALL_NEW',
    };

    let strBody = JSON.stringify(contactDetails);
    console.info(`Edit Brand Begins: String request - ${strBody}`);
    console.info(`Edit brand - ${params}`);
    console.info(
      `Edit Brand Begins: Service Table - ${BrandTable}'-'${brandId}`
    );
    const res = await documentClient.update(params).promise();
    if (!res) {
      throw new createError.InternalServerError(
        'Error while updating Contact Info'
      );
    }
    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(res.Attributes),
      }} Method: POST Action:Contact Info `
    );
    return res.Attributes;
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
