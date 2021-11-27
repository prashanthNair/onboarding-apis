"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveBrand = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const config_1 = require("../utils/config");
const constants_1 = require("../utils/constants");
const SaveBrand = async (brandRequest) => {
    try {
        let strBody = JSON.stringify(brandRequest);
        console.info(`Save Brand Begins: String request - ${strBody}`);
        console.info(`Save Brand Begins: Service Table - ${constants_1.BrandTable}'-'${brandRequest.Category}`);
        await config_1.documentClient
            .put({
            TableName: constants_1.BrandTable,
            Item: brandRequest,
        })
            .promise();
        console.info("Save Brand Service End:", brandRequest);
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
exports.SaveBrand = SaveBrand;
//# sourceMappingURL=saveBrand.js.map