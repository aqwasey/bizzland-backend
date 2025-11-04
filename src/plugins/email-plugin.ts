const brevo = require('@getbrevo/brevo');
require('dotenv').config(); // Load environment variables from .env

export interface IEmailParams {
	email?: string;
	name?: string;
	loan_id?: string;
	current_date?: string;
	template_id?: number;
}

export const SendEmail = async (param: IEmailParams) => {
	try {
		const client = new brevo.TransactionalEmailsApi();
		const apiKey = client.authentications['apiKey'];
		apiKey.apiKey = process.env.BREVO_API_KEY;
		let emailPool = new brevo.SendSmtpEmail();

		emailPool.to = [{ "email": param.email, "name": param.name }];
		emailPool.templateId = param.template_id || 1;
		emailPool.params = {
			"firstname": param.name,
			"loan_id": param.loan_id,
			"current_date": param.current_date,
		};

		client.sendTransacEmail(emailPool).then(
			function (data: any) {
				console.log('Email sent successfully.');
			}, function (error: any) {
				console.error(error);
		});

	} catch (error) {
		console.error(error);
	}
};
