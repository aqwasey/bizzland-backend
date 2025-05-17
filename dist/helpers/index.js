"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = exports.NOT_FOUND = exports.OK = exports.CONFLICT = exports.CREATED = exports.INTERNAL_SERVER_ERROR = exports.BAD_REQUEST = exports.BAD_GATEWAY = void 0;
const http_status_codes_1 = require("http-status-codes");
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.BAD_GATEWAY = http_status_codes_1.StatusCodes.BAD_GATEWAY, exports.BAD_REQUEST = http_status_codes_1.StatusCodes.BAD_REQUEST, exports.INTERNAL_SERVER_ERROR = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, exports.CREATED = http_status_codes_1.StatusCodes.CREATED, exports.CONFLICT = http_status_codes_1.StatusCodes.CONFLICT, exports.OK = http_status_codes_1.StatusCodes.OK, exports.NOT_FOUND = http_status_codes_1.StatusCodes.NOT_FOUND;
exports.transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'robertksam2000@gmail.com',
        pass: 'Robertina@2024'
    }
});
