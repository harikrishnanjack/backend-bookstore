const nodemailer = require("nodemailer");

/**
 * Email helper
 *
 * @description create transport
 *
 *
 */

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'lily.hilll@ethereal.email',
    pass: '1bXby7SUxSwTPtmJ3b'
  }
});

//sending mail

const send = (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await transporter.sendMail(info);

      console.log("Message sent: %s", result.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));

      resolve(result);
    } catch (error) {
      console.log(error);
    }
  });
};

const emailProcessor = ({ email, type, verificationLink = "" }) => {
  let info = "";
  switch (type) {
    case "new-user-confirmation-required":
      info = {
        from: '"CMR Company" <abe.kohler59@ethereal.email>',
        to: email,
        subject: "Please verify your new user",
        text:
          "Please follow the link to very your account before you can login",
        html: `<b>Hello </b>
        <p>Please follow the link to very your account before you can login</p>
        <p>${verificationLink}</P>
        `,
      };
      send(info);
      break;
    default:
      break;
  }
};

module.exports = { emailProcessor };
