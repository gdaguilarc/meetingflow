/* eslint-disable no-unused-vars */

/**
 * This method is in charge of comparing th econfirmation method
 */
function check() {
  if (validPasswords()) {
    document.getElementById('message').style.color = 'green';
    document.getElementById('message').innerHTML = 'Las contraseñas coinciden &#10004';
    document.getElementById('register-button').disabled = false;
  } else {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'Las contraseñas no coinciden &#10006';
    document.getElementById('register-button').disabled = true;
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

// SIDEBAR
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const mainBody = document.querySelector('.mainBody');

const toggleSidebar = function() {
  if (sidebar.className === 'sidebar open') {
    sidebar.className = 'sidebar';
    mainBody.className = 'mainBody closeBody';
  } else {
    sidebar.className = 'sidebar open';
    mainBody.className = 'mainBody openBody';
  }
};
