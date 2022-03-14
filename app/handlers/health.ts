import commonMidleware, {
  MakeHeaderRequest,
  ValidateHeader,
} from "../utils/commonMidleware";

export const healthCheck = async (event: any, context: any) => {
  console.log(context)
  let validateResponse = ValidateHeader(event["headers"]);
  if (!validateResponse.Status) {
    return {
      statusCode: 200,
      body: JSON.stringify(validateResponse),
    };
  }
  const headerRequest = MakeHeaderRequest(event["headers"]);

  console.log("Header", headerRequest);
  let respose = { status: true, message: "Brand Api Health CHeck Passed" };
  return {
    statusCode: 200,
    body: JSON.stringify(respose),
  };
};

export const handler = commonMidleware(healthCheck);
