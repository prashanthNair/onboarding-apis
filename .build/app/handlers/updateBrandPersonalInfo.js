"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = __importDefault(require("@middy/core"));
const http_cors_1 = __importDefault(require("@middy/http-cors"));
const editBrandPersonalInfo_1 = require("../services/editBrandPersonalInfo");
const updateBrandContact = async (event, context) => {
    let brandUpdateModel = JSON.parse(event.body);
    const now = new Date().toISOString();
    const brandrequest = {
        BrandId: brandUpdateModel.BrandId,
        Category: brandUpdateModel.Category,
        MobileNumber: brandUpdateModel.MobileNumber,
        CountryCode: brandUpdateModel.CountryCode,
        BrandName: brandUpdateModel.BrandName,
        Country: brandUpdateModel.Country,
        EmailId: brandUpdateModel.EmailId,
        UpdatedAt: now
    };
    let response = await (0, editBrandPersonalInfo_1.editBrand)(brandrequest);
    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };
};
exports.handler = (0, core_1.default)(updateBrandContact).use((0, http_cors_1.default)());
//# sourceMappingURL=updateBrandPersonalInfo.js.map