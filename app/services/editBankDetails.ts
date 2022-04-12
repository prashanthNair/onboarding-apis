import { documentClient } from '../utils/config';
import { BrandTable } from '../utils/constants';
import createError from 'http-errors';

export const editBankDetails = async (
  bankDetails: any,
  emailId: any,
  brandId: any
) => {
  try {
    const now = new Date();
    const params = {
      TableName: BrandTable,
      Key: {
        EmailId: emailId,
        BrandId: brandId,
      },
      ExpressionAttributeValues: {
        ':BankDetails': bankDetails,
        ':UpdatedAt': now.toUTCString(),
      },
      UpdateExpression:
        'SET BankDetails = :BankDetails, UpdatedAt = :UpdatedAt',
      ReturnValues: 'ALL_NEW',
    };

    let strBody = JSON.stringify(bankDetails);
    console.info(`Edit Brand Begins: String request - ${strBody}`);
    console.info(`Edit brand - ${params}`);
    console.info(
      `Edit Brand Begins: Service Table - ${BrandTable}'-'${brandId}`
    );
    const res = await documentClient.update(params).promise();
    if (!res) {
      throw new createError.InternalServerError(
        'Error while updating Bank details '
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
