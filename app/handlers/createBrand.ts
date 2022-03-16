import middy from "@middy/core";
import cors from "@middy/http-cors";
import { BrandModel } from "../model/brandModel";
import { SaveBrand } from "../services/saveBrand";
import createError from "http-errors";
import { ValidateHeader, MakeHeaderRequest } from "../utils/commonMidleware";
import { createUser } from "../services/createUser";

const createBrand = async (event: any) => {
  try {
    let validateResponse = ValidateHeader(event["headers"]);
    if (!validateResponse.Status) {
      return {
        statusCode: 200,
        body: JSON.stringify(validateResponse),
      };
    }
    const headerRequest = MakeHeaderRequest(event["headers"]);

    console.log("Header", headerRequest);

    if (!event.body) {
      const err = new createError.NotFound("Body Missing");
      return {
        statusCode: 200,
        body: JSON.stringify(err),
      };
    }

    let brandModel: BrandModel = JSON.parse(event.body);
    console.info("Request Body", event.body);
    const BrandId = "BR" + new Date().getTime().toString();
    const UserId = "U" + new Date().getTime().toString();
    const now = new Date();

    const subscription = [
      {
        SubscriptionsId: "",
        subscriptionName: "MigoInventory",
        period: "",
      },
    ];

    const bankDetails = {
      BeneficiaryName: "",
      BranchIFCCode: "",
      AccountNumber: "",
      AccountHolderName: "",
    };

    const Address = {
      Street: "",
      PostalCode: "",
      City: "",
      States: "",
    };

    const brandRequest: any = {
      BrandId: BrandId,
      UserID: UserId,
      BrandName: brandModel.BrandName ? brandModel.BrandName : "",
      Domain: brandModel.Domain ? brandModel.Domain : "",
      Category: brandModel.Category ? brandModel.Category : "All",
      Mobile: brandModel.Mobile ? brandModel.Mobile : "",
      EmailId: brandModel.EmailId,
      Country: brandModel.Country ? brandModel.Country : "",
      CountryCode: brandModel.CountryCode ? brandModel.CountryCode : "+91",
      RegBusinessName: brandModel.RegBusinessName
        ? brandModel.RegBusinessName
        : "",
      RegisteredType: brandModel.RegisteredType
        ? brandModel.RegisteredType
        : "",
      BrandUrl: brandModel.BrandUrl ? brandModel.BrandUrl : "",
      Tags: brandModel.Tags ? brandModel.Tags : [],
      PAN: brandModel.PAN ? brandModel.PAN : "",
      GSTN: brandModel.GSTN ? brandModel.GSTN : "",
      Address: brandModel.Address ? brandModel.Address : Address,
      Website: brandModel.Website ? brandModel.Website : "",
      BillingName: brandModel.BillingName ? brandModel.BillingName : "",
      Name: brandModel.Name ? brandModel.Name : "",
      Password: brandModel.Password,
      PANOwnerName: brandModel.PANOwnerName ? brandModel.PANOwnerName : "",
      Subscriptions: brandModel.Subscriptions
        ? brandModel.Subscriptions
        : subscription,
      BankDetails: brandModel.BankDetails
        ? brandModel.BankDetails
        : bankDetails,
      CreatedAt: now.toLocaleString(),
      UpdatedAt: now.toLocaleString(),
      Status: "Active",
    };
    if (brandRequest.EmailId == null || brandRequest.Password == null) {
      const err = new createError.NotFound("EmailId and Password required");
      return {
        statusCode: 200,
        body: JSON.stringify(err),
      };
    }

    let req = {
      header: headerRequest,
      body: { EmailId: brandRequest.EmailId, Password: brandRequest.Password },
    };

      createUser("user/register", req)
      .then((res) => {
        console.info(`CreateUser Response ${res}`);
      })
      .catch((err) => {
        console.error(`CreateUser Error ${err}`);
      });

    // if (!res) {
    //   throw new createError.InternalServerError("Error");
    // }
    let response = await SaveBrand(brandRequest);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};

export const handler = middy(createBrand).use(cors());
