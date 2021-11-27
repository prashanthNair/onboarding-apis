"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.healthCheck = void 0;
const commonMidleware_1 = __importDefault(require("../utils/commonMidleware"));
const healthCheck = async (event, context) => {
    let respose = { status: true, message: "Brand Api Health CHeck Passed" };
    return {
        statusCode: 200,
        body: JSON.stringify(respose),
    };
};
exports.healthCheck = healthCheck;
exports.handler = (0, commonMidleware_1.default)(exports.healthCheck);
//# sourceMappingURL=health.js.map