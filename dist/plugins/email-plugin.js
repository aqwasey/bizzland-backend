"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmail = void 0;
const brevo = require('@getbrevo/brevo');
require('dotenv').config(); // Load environment variables from .env
const SendEmail = (param) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = new brevo.TransactionalEmailsApi();
        const apiKey = client.authentications['apiKey'];
        apiKey.apiKey = process.env.BREVO_API_KEY;
        let emailPool = new brevo.SendSmtpEmail();
        emailPool.to = [{ "email": param.email, "name": param.name }];
        emailPool.templateId = param.template_id || 1;
        emailPool.params = {
            "firstname": param.name, "loan_id": param.loan_id,
            "current_date": param.current_date,
        };
        client.sendTransacEmail(emailPool).then(function (data) {
            console.log('Email sent successfully.');
        }, function (error) {
            console.error(error);
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.SendEmail = SendEmail;
