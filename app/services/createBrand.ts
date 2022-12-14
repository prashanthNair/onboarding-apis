import createError from 'http-errors';
import { IUser } from '../interfaces/IUser';
import { documentClient, dynamoDB } from '../utils/config';
import { BrandTable } from '../utils/constants';
import { PostUserAsync } from '../utils/httpClient';

export const CreateBrand = async (
  headerRequest,
  brandRequest: any,
  accountCreation: any
) => {
  try {
    console.info(
      `Request: Method: POST Name: Save Brand: String request - ${JSON.stringify(
        brandRequest
      )}`
    );

    let req = {
      header: headerRequest,
      body: {
        EmailId: accountCreation.EmailId,
        Password: accountCreation.Password,
        UserRoles: ['Brand'],
      },
    };

    const res = await PostUserAsync('authorizer/register', req);

    if (!res && !res.data) {
      return null;
    }
    const userResponse: IUser = {
      EmailId: res.data.EmailId,
      UserId: res.data.UserId,
    };

    console.log(
      'Response: SaveBrand: Create User Response',
      userResponse.UserId
    );

    if (userResponse.UserId) {
      brandRequest.UserID = userResponse.UserId;
    }

    const params = {
      TableName: BrandTable,
      Item: brandRequest,
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

export const ValidateEmail = async (brandRequest) => {
  try {
    let query = {
      Statement: `SELECT EmailId FROM "${BrandTable}" where EmailId = '${brandRequest.EmailId}'`,
    };
    var result = await dynamoDB.executeStatement(query).promise();
    if (brandRequest.EmailId == result.Items[0].EmailId.S) return true;
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
