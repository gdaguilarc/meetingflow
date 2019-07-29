import { header } from './header';
import { footer } from './footer';

/**
 *  This is the template of the email for the new users
 * @param {String} user
 * @param {String} companyName
 * @return {String} template
 */
function welcomeUser(user, companyName) {
  return `
  ${header(companyName)}
  <p style="font-size: 12px; line-height: 33px; text-align: center; margin: 0;"><span style="font-size: 28px;">Hola ${user}!!</span></p>
        <h3>Bienvenido al sistema "Meetingflow"</h3>
        <h3>Ahora podras disfrutar de los siguientes beneficios:</h3>
        <ul>
          <li>Aparata salas para tus juntas</li>
          <li>Registra a tus invitados</li>
          <li>Envia invitaciones</li>
        </ul>
  ${footer(companyName)}
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
  ${header(company)}
  <p style="font-size: 12px; line-height: 33px; text-align: center; margin: 0;"><span style="font-size: 28px;">Hola ${guest}!!</span></p>
  <h3>Bienvenido a ${company}, estamos muy contentos por tu visita!</h3>
  <h3>${host} vendra por ti en unos momentos </h3>
  <h3>Tu junta se llevara a cabo en "${room}"</h3>
  ${footer(company)}
`;
}

/**
 *
 * @param {String} user
 * @param {String} room
 * @param {String} location
 * @param {String} date
 * @param {String} startTime
 * @param {String} endTime
 * @param {String} companyName
 * @return {String} template
 */
function reservationMade(user, room, location, date, startTime, endTime, companyName) {
  return `
  ${header(companyName)}
  <p style="font-size: 12px; line-height: 33px; text-align: center; margin: 0;"><span style="font-size: 28px;">Hola ${user}!!</span></p>
  <h3>Tu reservación ha sido exitosa!</h3>
  <h3>La ${room} de ${location} ha quedado apartada el día ${date} de ${startTime} a ${endTime} hrs.</h3>
  ${footer(companyName)}`;
}

export { welcomeUser, welcomeGuest, reservationMade };
