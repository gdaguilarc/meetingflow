import mail from '@sendgrid/mail';

// function isAuthennticated(params) {
//   // TODO: create the method
// }

// function isSetup() {
//   // TODO: create method
// }

/**
 * Sends a mail to the new user
 * @param {String} receiver
 */
function accountWelcome(receiver) {
  mail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: receiver,
    from: 'test@example.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  };
  mail.send(msg);
}

export { accountWelcome };
