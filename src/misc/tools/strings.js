/**
 * Returns the first name of a fullname
 * @param {String} fullname
 * @return {String}
 */
function getFirstName(fullname) {
  return fullname.split(' ')[0];
}

export { getFirstName };
