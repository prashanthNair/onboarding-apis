import {
  MakeHeaderRequest,
  responseBuilder,
  ValidateHeader,
} from '../utils/commonMiddleware';

export const handler = async (event: any, context: any) => {
  console.log(context);
  let validateResponse = ValidateHeader(event['headers']);
  if (!validateResponse.Status) {
    return responseBuilder(validateResponse);
  }
  const headerRequest = MakeHeaderRequest(event['headers']);

  console.log('Header', headerRequest);
  let respose = { status: true, message: 'Brand Api Health CHeck Passed' };
  return responseBuilder(respose);
};

// export const handler = commonMidleware(healthCheck);;
