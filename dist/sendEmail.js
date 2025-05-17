"use strict";
// // import {
// //   TransactionalEmailsApi,
// //   TransactionalEmailsApiApiKeys,
// // } from "@sendinblue/client";
// import dotenv from "dotenv";
// // import SibApiV3Sdk from 'sib-api-v3-sdk'
// dotenv.config();
// interface EmailData {
//   firstname: string;
//   loan_id: string;
//   current_date?: string;
//   tracker?: string;
//   to?: [];
// }
// // Initialize the Brevo client
// const brevoClient = new TransactionalEmailsApi();
// brevoClient.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '');
// // Function to send transactional emails
// export const sendTransactionalEmail = async (emailData: EmailData): Promise<any> => {
//   const { subject, htmlContent} = emailData
//   try {
//     const email = {
//       sender: { name: 'Bizzland', email: 'bizzland@gmail.com' },
//       to: [{ email: emailData.to, name: emailData.FIRSTNAME }],
//       // templateId,
//       // params,
//       // subject,
//       // htmlContent, 
//     };
//     const response = await brevoClient.sendTransacEmail(email);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };
// // OPTION 1
// // ++++++++++++++++++++++++++++++++++++++++++++++
// import SibApiV3Sdk from 'sib-api-v3-typescript';
// let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
// let apiKey = apiInstance.authentications['apiKey'];
// apiKey.apiKey = process.env.BREVO_API_KEY || "";
// let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 
// sendSmtpEmail.to = [{"email":"example@example.com","name":"Jane Doe"}];
// sendSmtpEmail.templateID = 4;
// sendSmtpEmail.params = {firstname, loan_id, current_date: new Date()};
// apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data: any) {
//   console.log('Email sent successfully. Returned data: ' + JSON.stringify(data));
// }, function(error: any) {
//   console.error(error);
// });
// // // Initialize the Brevo client
// // const brevoClient = new TransactionalEmailsApi();
// // brevoClient.setApiKey(
// //   TransactionalEmailsApiApiKeys.apiKey,
// //   process.env.BREVO_API_KEY || ""
// // );
// // // Function to send transactional emails
// // export const sendTransactionalEmail = async (
// //   emailData: EmailData
// // ): Promise<any> => {
// //   const { firstname, loan_id, to } = emailData;
// //   try {
// //     let defaultClient = SibApiV3Sdk.ApiClient.instance;
// //     const apiAuth = defaultClient.authentications["api-key"];
// //     apiAuth.apiKey = process.env.BREVO_API_KEY;
// //     const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
// //     let emailData = {
// //       to: [{ name: firstname , email: to }],
// //       templateId: 4,
// //       // firstname, loan_id, current_date: new Date()
// //       params: { firstname, loan_id, current_date: new Date() },
// //     };
// //     let response = apiInstance.sendTransacEmail(emailData);
// //     console.log("API called successfully. Returned data: " + response);
// //   } catch (error) {
// //     console.error(error);
// //   }
// // };
// // import brevo from "@getbrevo/brevo";
// // let apiInstance = new brevo.TransactionalEmailsApi();
// // let apiKey = apiInstance.authentications["api-key"];
// // apiKey.apiKey = process.env.BREVO_API_KEY || "";
// // let sendSmtpEmail = new brevo.SendSmtpEmail();
// // const sendEmail = async (data: EmailData) => {
// //   sendSmtpEmail.to = [
// //     { email: firstname, name: to },
// //   ];
// //   sendSmtpEmail.params = { firstname, loan_id, current_date: new Date() };
// //   apiInstance.sendTransacEmail(sendSmtpEmail).then(
// //     function (data) {
// //       console.log(
// //         "Email sent successfully. Returned data: " + JSON.stringify(data)
// //       );
// //     },
// //     function (error) {
// //       console.error(error);
// //     }
// //   );
// // };
