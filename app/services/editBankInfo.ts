import { documentClient } from '../utils/config';
import { BrandTable } from '../utils/constants';
import createError from 'http-errors';

export const editBankInfo = async (businessDetails: any, emailId, brandId) => {
  try {
    const now = new Date();
    const params = {
      TableName: BrandTable,
      Key: {
        EmailId: emailId,
        BrandId: brandId,
      },
      ExpressionAttributeNames: {
        '#BankDetails': 'BankDetails',
        '#UpdatedAt': 'UpdatedAt',
        '#profileCompletion': 'ProfileCompletion',
        '#contact': 'BankDetails',
      },
      ExpressionAttributeValues: {
        ':completionScore': 'Completed',
        ':BankDetails': businessDetails,
        ':UpdatedAt': now.toUTCString(),
      },
      UpdateExpression:
        'SET  #profileCompletion.#contact= :completionScore, #BankDetails = :BankDetails, #UpdatedAt = :UpdatedAt',
      ReturnValues: 'ALL_NEW',
    };

    let strBody = JSON.stringify(businessDetails);
    console.info(`Edit Brand Begins: String request - ${strBody}`);
    console.info(`Edit brand - ${params}`);
    console.info(
      `Edit Brand Begins: Service Table - ${BrandTable}'-'${emailId}`
    );
    const res = await documentClient.update(params).promise();
    if (!res) {
      throw new createError.InternalServerError(
        'Error while updating Business details'
      );
    }
    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(res.Attributes),
      }} Method: POST Action:GetBrand `
    );
    return res.Attributes;
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
