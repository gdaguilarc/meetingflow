/* eslint-disable no-unused-vars */

/**
 * This method is in charge of comparing th econfirmation method
 */
function check() {
  if (validPasswords()) {
    document.getElementById('message_container').classList.add('valid_input');
    document.getElementById('message_container').classList.remove('invalid_input');
  } else {
    document.getElementById('message_container').classList.add('invalid_input');
    document.getElementById('message_container').classList.remove('valid_input');
  }
}

/**
 * Detects if there is something in the password
 * @return {Boolean}
 */
function validPasswords() {
  return (
    document.getElementById('password').value ==
      document.getElementById('confirm_password').value &&
    document.getElementById('password').value != ''
  );
}
