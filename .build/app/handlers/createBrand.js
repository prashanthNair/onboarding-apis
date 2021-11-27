"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = __importDefault(require("@middy/core"));
const http_cors_1 = __importDefault(require("@middy/http-cors"));
const saveBrand_1 = require("../services/saveBrand");
const createBrand = async (event, context) => {
    const { brandName } = event.body;
    let brandRegstermodel = JSON.parse(event.body);
    console.info("Request Event", event);
    console.info("Request Body", event.body);
    const BrandId = "BR" + new Date().getTime().toString();
    const UserId = "U" + new Date().getTime().toString();
    const now = new Date();
    const endDate = new Date();
    endDate.setHours(now.getHours() + 1);
    const brandRequest = {
        BrandId: BrandId,
        UserID: UserId,
        BrandName: brandRegstermodel.BrandName,
        Domain: brandRegstermodel.Domain,
        Category: brandRegstermodel.Category,
        MobileNumber: brandRegstermodel.MobileNumber,
        EmailId: brandRegstermodel.EmailId,
        Country: brandRegstermodel.Country,
        Subscriptions: { "subscription Name": "MigoInventory" },
        CountryCode: brandRegstermodel.CountryCode,
        RegBusinessName: brandRegstermodel.RegBusinessName,
        RegisteredType: brandRegstermodel.RegisteredType,
        BrandUrl: brandRegstermodel.BrandUrl,
        Tags: brandRegstermodel.Tags,
        PAN: brandRegstermodel.PAN,
        GST: brandRegstermodel.GST,
        Address: brandRegstermodel.Address,
        UserName: brandRegstermodel.UserName,
        AccountPassword: brandRegstermodel.AccountPassword,
        CreatedAt: now.toISOString(),
        UpdatedAt: now.toISOString(),
        Status: "Active",
    };
    let response = await (0, saveBrand_1.SaveBrand)(brandRequest);
    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };
};
exports.handler = (0, core_1.default)(createBrand).use((0, http_cors_1.default)());
//# sourceMappingURL=createBrand.js.map