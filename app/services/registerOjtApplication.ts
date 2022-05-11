import createError from 'http-errors';
import { documentClient } from '../utils/config';
import { OJT_TABLE } from '../utils/constants';

export const Register = async (applicantInfo: any) => {
  try {
    console.info(
      `Request: Method: POST Name: Save Brand: String request - ${JSON.stringify(
        applicantInfo
      )}`
    );

    const params = {
      TableName: OJT_TABLE,
      Item: applicantInfo,
      ReturnValues: 'ALL_OLD',
    };

    const response = await documentClient.put(params).promise();
    console.log('Datastore', response);
    if (!response) return null;

    console.log('Datastore', response);
    console.info('Response: Datastore Save Brand Service End:', response);
    return params.Item;
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
