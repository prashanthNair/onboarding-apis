import { documentClient } from '../utils/config';
import { BrandTable } from '../utils/constants';
import createError from 'http-errors';

export const editDocuments = async (documents: any, emailId, brandId) => {
  try {
    const now = new Date();
    const params = {
      TableName: BrandTable,
      Key: {
        EmailId: emailId,
        BrandId: brandId,
      },
      ExpressionAttributeNames: {
        '#Documents': 'Documents',
        '#UpdatedAt': 'UpdatedAt',
        '#profileCompletion': 'ProfileCompletion',
        '#documents': 'Documents',
      },
      ExpressionAttributeValues: {
        ':completionScore': 'Completed',
        ':Documents': documents,
        ':UpdatedAt': now.toUTCString(),
      },
      UpdateExpression:
        'SET #profileCompletion.#documents= :completionScore, #Documents = :Documents, #UpdatedAt = :UpdatedAt',

      ReturnValues: 'ALL_NEW',
    };

    let strBody = JSON.stringify(documents);
    console.info(`Edit Brand Begins: String request - ${strBody}`);
    console.info(`Edit brand - ${params}`);
    console.info(
      `Edit Brand Begins: Service Table - ${BrandTable}'-'${brandId}`
    );
    const res = await documentClient.update(params).promise();
    if (!res) {
      throw new createError.InternalServerError(
        'Error while updating Documents Info'
      );
    }
    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(res.Attributes),
      }} Method: POST Action:Documents Info `
    );
    return res.Attributes;
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
