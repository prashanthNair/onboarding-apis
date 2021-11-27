"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = __importDefault(require("@middy/core"));
const http_cors_1 = __importDefault(require("@middy/http-cors"));
const editBrand_1 = require("../services/editBrand");
const updateBrand = async (event, context) => {
    let brandUpdateModel = JSON.parse(event.body);
    const now = new Date().toISOString();
    const brandrequest = {
        BrandId: brandUpdateModel.BrandId,
        MobileNumber: brandUpdateModel.MobileNumber,
        Category: brandUpdateModel.Category,
        AccountPassword: brandUpdateModel.AccountPassword,
        BrandName: brandUpdateModel.BrandName,
        Country: brandUpdateModel.Country,
        EmailId: brandUpdateModel.EmailId,
        RegBusinessName: brandUpdateModel.RegBusinessName,
        Address: brandUpdateModel.Address,
        UpdatedAt: now
    };
    let response = await (0, editBrand_1.editBrand)(brandrequest);
    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };
};
exports.handler = (0, core_1.default)(updateBrand).use((0, http_cors_1.default)());
//# sourceMappingURL=updateBrand.js.map