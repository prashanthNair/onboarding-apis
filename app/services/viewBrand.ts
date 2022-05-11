import { dynamoDB } from '../utils/config';
import createError from 'http-errors';
import { BrandTable } from '../utils/constants';
import AWS from 'aws-sdk';

export const getBrandDetails = async (params) => {
  try {
    let query = {
      Statement: `SELECT * FROM "${BrandTable}" where EmailId = '${params}'`,
    };
    var result = await dynamoDB.executeStatement(query).promise();
    var converted = result.Items.map((el) =>
      AWS.DynamoDB.Converter.unmarshall(el)
    );

    if (converted && converted.length < 0)
      throw new createError.InternalServerError();

    return converted[0];
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
