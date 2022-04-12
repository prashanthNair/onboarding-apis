import { documentClient } from '../utils/config';
import { BrandTable } from '../utils/constants';
import createError from 'http-errors';

export const editContactInfo = async (contactInfo: any, emailId, brandId) => {
  try {
    const now = new Date();
    const params = {
      TableName: BrandTable,
      Key: {
        EmailId: emailId,
        BrandId: brandId,
      },
      ExpressionAttributeNames: {
        '#ContactInfo': 'ContactInfo',
        '#UpdatedAt': 'UpdatedAt',
      },
      ExpressionAttributeValues: {
        ':ContactInfo': contactInfo,
        ':UpdatedAt': now.toUTCString(),
      },
      UpdateExpression:
        'SET #ContactInfo = :ContactInfo, #UpdatedAt = :UpdatedAt',
      ReturnValues: 'ALL_NEW',
    };

    let strBody = JSON.stringify(contactInfo);
    console.info(`Edit Brand Begins: String request - ${strBody}`);
    console.info(`Edit brand - ${params}`);
    console.info(
      `Edit Brand Begins: Service Table - ${BrandTable}'-'${brandId}`
    );
    const res = await documentClient.update(params).promise();
    console.info('Edit Brand Service End:', contactInfo);

    return contactInfo;
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
