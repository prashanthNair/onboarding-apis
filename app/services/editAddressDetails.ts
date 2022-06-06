import { documentClient } from '../utils/config';
import { BrandTable } from '../utils/constants';
import createError from 'http-errors';

export const editAddressDetails = async (
  addressDetails: any,
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
      UpdateExpression:
        'SET #profileCompletion.#address= :completionScore, #AddressDetails = :AddressDetails, #UpdatedAt = :UpdatedAt',
      ExpressionAttributeValues: {
        ':AddressDetails': addressDetails,
        ':UpdatedAt': now.toUTCString(),
        ':completionScore': 'Completed',
      },
      ExpressionAttributeNames: {
        '#AddressDetails': 'AddressDetails',
        '#profileCompletion': 'ProfileCompletion',
        '#address': 'AddressDetails',
        '#UpdatedAt': 'UpdatedAt',
      },
      ReturnValues: 'ALL_NEW',
    };

    let strBody = JSON.stringify(addressDetails);
    console.info(`Edit addressDetails: String request - ${strBody}`);
    console.info(`Edit addressDetails - ${params}`);
    console.info(
      `Edit addressDetails Begins: Service Table - ${BrandTable}'-'${brandId}`
    );
    const res = await documentClient.update(params).promise();
    if (!res) {
      throw new createError.InternalServerError(
        'Error while updating addressDetails '
      );
    }
    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(res.Attributes),
      }} Method: PATCH Action:addressDetails `
    );
    return res.Attributes;
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
