/**
 *
 * @param { Object } req
 * @param { Object } res
 * @param { Object } next
 * @return { Object }
 */
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  return req.isAuthenticated();
}

/**
 *
 * @param { Object } req
 * @param { Object } res
 * @param { Boolean } authority
 * @return { Boolean }
 */
function hasAccess(req, res, authority) {
  if (authority === 'Admin') {
    if (req.user.authority !== authority) return false;
  }
  return true;
}

/**
 *
 * @param { Object } req
 * @param { Object } res
 * @param { Object } next
 * @param { String } administrator
 * @return { Boolean }
 */
function accessManager(req, res, next, administrator = 'Basic') {
  if (isLoggedIn(req, res, next) && hasAccess(req, res, administrator)) {
    next();
  } else {
    return res.status(401).redirect('/signin');
  }
}

export default accessManager;
