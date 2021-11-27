"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editBrand = void 0;
const config_1 = require("../utils/config");
const constants_1 = require("../utils/constants");
const http_errors_1 = __importDefault(require("http-errors"));
const editBrand = async (brandRequest) => {
    try {
        const params = {
            TableName: constants_1.BrandTable,
            Key: {
                BrandId: brandRequest.BrandId,
                Category: brandRequest.Category,
            },
            ExpressionAttributeNames: {
                "#MobileNumber": "MobileNumber",
                "#name": "UserName",
                "#password": "AccountPassword",
                "#brandname": "BrandName",
                "#category": "Category",
                "#country": "Country",
                "#countrycode": "CountryCode",
                "#emailid": "EmailId",
                "#lastupdateddate": "UpdatedAt",
                "#regbusinessname": "RegBusinessName",
                "#registeredtype": "RegisteredType",
                "#subscriptions": "Subscriptions",
                "#Address": "Address"
            },
            ExpressionAttributeValues: {
                ":MobileNumber": brandRequest.MobileNumber,
                ":UserName": brandRequest.UserName,
                ":AccountPassword": brandRequest.AccountPassword,
                ":BrandName": brandRequest.BrandName,
                ":Category": brandRequest.Category,
                ":Country": brandRequest.Country,
                ":CountryCode": brandRequest.CountryCode,
                ":EmailId": brandRequest.EmailId,
                ":UpdatedAt": brandRequest.UpdatedAt,
                ":RegBusinessName": brandRequest.RegBusinessName,
                ":RegisteredType": brandRequest.RegisteredType,
                ":Subscriptions": brandRequest.Subscriptions,
                ":Address": brandRequest.Address
            },
            UpdateExpression: "SET #MobileNumber = :MobileNumber,#name= :UserName, #password= :AccountPassword, #brandname= :BrandName, #category= :Category, #country= :Country, #countrycode= :CountryCode, #emailid= :EmailId, #lastupdateddate=:lastUpdatedDate, #regbusinessname= :RegBusinessName,  #registeredtype= :RegisteredType, #Address= :Address",
            ReturnValues: "ALL_NEW",
        };
        let strBody = JSON.stringify(brandRequest);
        console.info(`Edit Brand Begins: String request - ${strBody}`);
        console.info(`Edit brand - ${params}`);
        console.info(`Edit Brand Begins: Service Table - ${constants_1.BrandTable}'-'${brandRequest.BrandId}`);
        await config_1.documentClient.update(params).promise();
        console.info("Edit Brand Service End:", brandRequest);
    }
    catch (error) {
        console.error(error);
        throw new http_errors_1.default.InternalServerError(error);
    }
    return {
        statusCode: 200,
        body: JSON.stringify(brandRequest),
    };
};
exports.editBrand = editBrand;
//# sourceMappingURL=editBrand.js.map