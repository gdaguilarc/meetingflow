/**
 * Returns the first name of a fullname
 * @param {String} fullname
 * @return {String}
 */
function getFirstName(fullname) {
  const nameSeparated = fullname.split(' ');
  return nameSeparated[0];
}

export { getFirstName };
