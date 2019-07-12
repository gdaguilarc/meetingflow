/* eslint-disable no-unused-vars */

/**
 * This method is in charge of comparing th econfirmation method
 */
function check() {
  if (validPasswords()) {
    document.getElementById('confirm_password').classList.add('is-valid');
    document.getElementById('confirm_password').classList.remove('is-invalid');
  } else {
    document.getElementById('confirm_password').classList.add('is-invalid');
    document.getElementById('confirm_password').classList.remove('is-valid');
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
    mainBody.className = 'mainBody closeBody bg-light';
  } else {
    sidebar.className = 'sidebar open';
    mainBody.className = 'mainBody openBody bg-light';
  }
};
