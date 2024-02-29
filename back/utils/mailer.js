// emailService.js
const SibApiV3Sdk = require("@getbrevo/brevo");

class EmailService {
  constructor(apiKey) {
    this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    this.apiKey = apiKey;
  }

  sendTransactionalEmail(
    subject,
    htmlContent,
    sender,
    to,
    cc,
    bcc,
    replyTo,
    headers,
    params
  ) {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = sender;
    sendSmtpEmail.to = to;
    sendSmtpEmail.cc = cc;
    sendSmtpEmail.bcc = bcc;
    sendSmtpEmail.replyTo = replyTo;
    sendSmtpEmail.headers = headers;
    sendSmtpEmail.params = params;

    let apiKeyInstance = this.apiInstance.authentications["apiKey"];
    apiKeyInstance.apiKey = this.apiKey;

    return this.apiInstance.sendTransacEmail(sendSmtpEmail);
  }
}

module.exports = EmailService;
