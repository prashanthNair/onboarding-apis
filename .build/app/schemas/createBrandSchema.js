"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBrandSchema = void 0;
const schema = {
    properties: {
        body: {
            type: 'object',
            properties: {
                brandId: {
                    type: 'string',
                },
                brandName: {
                    type: 'string',
                },
                mobileNumber: {
                    type: 'string',
                },
                emailId: {
                    type: 'string',
                }
            },
            required: ['brandId', "brandName", 'mobileNumber', 'emailId'],
        },
    },
    required: ['body'],
};
exports.CreateBrandSchema = schema;
//# sourceMappingURL=createBrandSchema.js.map