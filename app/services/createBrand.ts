import createError from "http-errors";
import { IUser } from "../interfaces/IUser";
import { documentClient } from "../utils/config";
import { BrandTable } from "../utils/constants";
import { PostUserAsync } from "../utils/httpClient";

export const CreateBrand = async (headerRequest, brandRequest: any) => {
  try {
    console.info(
      `Request: Method: POST Name: Save Brand: String request - ${JSON.stringify(
        brandRequest
      )}`
    );

    let req = {
      header: headerRequest,
      body: {
        EmailId: brandRequest.EmailId,
        Password: brandRequest.Password,
        UserRoles: ["Brand"],
      },
    };

    let { data }: any = await PostUserAsync("user/register", req);

    if (!data) {
      return null;
    }
    data = JSON.parse(data);
    const userResponse: IUser = {
      EmailId: data.EmailId,
      UserId: data.UserId,
    };

    console.log(
      "Response: SaveBrand: Create User Response",
      userResponse.UserId
    );

    if (userResponse.UserId) {
      brandRequest.UserID = userResponse.UserId;
    }

    const params = {
      TableName: BrandTable,
      Item: brandRequest,
      ReturnValues: "ALL_OLD",
    };

    const response = await documentClient.put(params).promise();
    console.log("Datastore", response);
    if (!response) return null;

    console.log("Datastore", response);
    console.info("Response: Datastore Save Brand Service End:", response);
    return params.Item;
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
