"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@middy/core"));
const http_event_normalizer_1 = __importDefault(require("@middy/http-event-normalizer"));
const http_error_handler_1 = __importDefault(require("@middy/http-error-handler"));
const http_cors_1 = __importDefault(require("@middy/http-cors"));
exports.default = (handler) => (0, core_1.default)(handler).use([
    // httpJsonBodyParser(),
    (0, http_event_normalizer_1.default)(),
    (0, http_error_handler_1.default)(),
    (0, http_cors_1.default)(),
]);
//# sourceMappingURL=commonMidleware.js.map