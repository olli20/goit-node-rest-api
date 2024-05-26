import sgMail from "@sendgrid/mail";
import HttpError from "../utils/httpError.js";

const { SENDGRID_API_KEY, SEND_EMAIL } = process.env;

const sendEmail = async (to, subject, html) => {
  sgMail.setApiKey(SENDGRID_API_KEY);

  const message = {
    to,
    from: SEND_EMAIL,
    subject,
    html,
  };

  try {
    await sgMail.send(message);
  } catch (error) {
    return new HttpError(500, error);
  }
};

export default sendEmail;
