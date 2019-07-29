/**
 *  This is the template of the email for the new users
 * @param {String} user
 * @return {String} template
 */
function welcomeUser(user) {
  return `
      <div>
        <h1>Bienvenido ${user}!!</h1>
        <h3>Bienvenido al sistema "Meetingflow"</h3>
        <h3>Ahora podras disfrutar de los siguientes beneficios:</h3>

        <ul>
          <li>Aparata salas para tus juntas</li>
          <li>Registra a tus invitados</li>
          <li>Envia invitaciones</li>
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
        <h1>Bienvenido ${guest}</h1>
        <h3>Bienvenido a ${company}, estamos muy contentos por su visita!</h3>
        <h3>${host} vendra por ti en unos momentos </h3>
        <h3>Tu junta se llevara a cabo en "${room}"</h3>
      </div>
`;
}

export { welcomeUser, welcomeGuest };
