import sgMail from "@sendgrid/mail";

export const initialSetup = () => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
};
