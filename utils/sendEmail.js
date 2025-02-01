import sgMail from "@sendgrid/mail";

const sendEmail = async (mailObj) => {
  try {
    await sgMail.send(mailObj);
    console.log("Email sent successfully.");
  } catch (emailError) {
    console.error(
      "Error sending email:",
      emailError.response ? emailError.response.body : emailError
    );
  }
};

export default sendEmail;
