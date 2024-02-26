import {
  ApiClient,
  TransactionalEmailsApi,
  SendSmtpEmail,
} from "@getbrevo/brevo";
let defaultClient = ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

let apiInstance = new TransactionalEmailsApi();
let sendSmtpEmail = new SendSmtpEmail();

sendSmtpEmail.subject = "My {{params.subject}}";
sendSmtpEmail.htmlContent =
  "<html><body><h1>Common: This is my first transactional email {{params.parameter}}</h1></body></html>";
sendSmtpEmail.sender = { name: "John", email: "example@example.com" };
sendSmtpEmail.to = [{ email: "example@brevo.com", name: "sample-name" }];
sendSmtpEmail.replyTo = { email: "example@brevo.com", name: "sample-name" };
sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
sendSmtpEmail.params = {
  parameter: "My param value",
  subject: "common subject",
};

apiInstance.sendTransacEmail(sendSmtpEmail).then(
  function (data) {
    console.log(
      "API called successfully. Returned data: " + JSON.stringify(data)
    );
  },
  function (error) {
    console.error(error);
  }
);
