import sgmail from '@sendgrid/mail';

/**
 *
 * @param {String} destination The mail of the receiver
 * @param {String} subject Main topic of the email
 * @param {String} text The text in the body of the email
 * @param {String} template HTML of the email body
 */
function sendMail(destination, subject, text, template) {
  sgmail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: destination,
    from: process.env.ORGANIZATION_MAIL,
    subject: subject,
    text: text,
    html: template
  };
  sgmail.send(msg);
}

export { sendMail };
