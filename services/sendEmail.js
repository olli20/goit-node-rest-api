import sgMail from "@sendgrid/mail";

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
    const info = await sgMail.send(message);
    console.log(info);
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
