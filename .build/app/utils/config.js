"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentClient = exports.dynamoDB = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const awsConfig = {
    accessKeyId: "AKIAZYADTUF3SY5V6HHW",
    secretAccessKey: "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",
    region: "ap-south-1",
};
aws_sdk_1.default.config.update(awsConfig);
const dynamoDB = new aws_sdk_1.default.DynamoDB();
exports.dynamoDB = dynamoDB;
const documentClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
exports.documentClient = documentClient;
//# sourceMappingURL=config.js.map