/**
 *  This is the template of the email for the new users
 * @param {String} user
 * @return {String} template
 */
function welcomeUser(user) {
  return `
      <div>
        <h1>Welcome ${user}</h1>
        <h3>Welcome to meetingflow system</h3>
        <h3>You can take advantage of this features</h3>

        <ul>
          <li>Create meetings</li>
          <li>Register your guests</li>
        </ul>
      </div>
      `;
}

/**
 *  This template is for the registered guests
 * @param {String} guest
 * @param {String} company
 * @param {String} host
 * @param {String} room
 * @return {String} template
 */
function welcomeGuest(guest, company, host, room) {
  return `
      <div>
        <h1>Welcome ${guest}</h1>
        <h3>Welcome to ${company}, we are glad to have you here!</h3>
        <h3>${host} is comming for you</h3>
        <h3>YOur meeting is going to be in the room ${room}</h3>
      </div>
`;
}

export { welcomeUser, welcomeGuest };
