import { documentClient, dynamoDB } from "../utils/config";
import createError from "http-errors";
import { BrandTable } from "../utils/constants";
import AWS from "aws-sdk";



export const getBrandDetailsByEmail = async (params) => {

    try {
        let query = {
          Statement: `SELECT * FROM "${BrandTable}" where EmailId = '${params}'`,
        };
        var result = await dynamoDB.executeStatement(query).promise();
        var converted = result.Items.map((el) =>
      AWS.DynamoDB.Converter.unmarshall(el)
    );
    // return converted;
    


      } catch (error: any) {
        console.error(error);
        throw new createError.InternalServerError(error);
      }
      return {
        statusCode: 200,
        body: JSON.stringify(converted),
      };
    };