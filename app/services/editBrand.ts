import { documentClient,dynamoDB } from "../utils/config";
import { BrandTable } from "../utils/constants";
import createError from "http-errors";


export const editBrand = async (brandRequest: any) => {
    try {
      let strBody =  JSON.stringify(brandRequest)
      console.info(`Edit Brand Begins: String request - ${strBody}`);
      console.info(`Edit Brand Begins: Service Table - ${BrandTable}'-'${brandRequest.BrandId}`);
      await documentClient.update(
            brandRequest
        )
        .promise();
  
      console.info("Edit Brand Service End:", brandRequest);
    } catch (error: any) {
      console.error(error);
      throw new createError.InternalServerError(error);
    }
    return {
      statusCode: 200,
      body: JSON.stringify(brandRequest),
    };
  };