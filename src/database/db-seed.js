import faker from 'faker';
import GuestModel from '../models/Guest-model';
import UserModel from '../models/User-model';
import LocationModel from '../models/Location-model';
import RoomModel from '../models/Room-model';

require('dotenv').config();
require('./connection');

/**
 * The procedure that generates the data
 */
async function generateData() {
  const randnumLocations = Math.floor(Math.random() * 10);
  const randnumUsers = Math.floor(Math.random() * 20);
  const randnumGuests = Math.floor(Math.random() * 20);
  const randnumRooms = Math.floor(Math.random() * 5);

  const userpool = [];
  const roomspool = [];

  /**
   * Crating the random locations
   */
  for (let i = 0; i < randnumLocations; i++) {
    const location = new LocationModel();
    location.firstLine = faker.address.streetAddress();
    location.externalNumber = faker.random.number({ min: 100, max: 10000 });
    location.internalNumber = faker.address.zipCode();
    const { _id } = await location.save();
    roomspool.push(_id);
  }

  for (let i = 0; i < randnumUsers; i++) {
    const user = new UserModel();
    user.name = `${faker.name.firstName()} ${faker.name.lastName()}`;
    user.email = faker.internet.email();
    user.password = user.encryptPassword('12345');
    user.phone = faker.phone.phoneNumber();
    user.position = faker.name.jobTitle();
    user.office = faker.address.streetAddress();
    user.authority = faker.random.arrayElement(['Basic', 'Admin']);
    user.isActivated = faker.random.boolean();

    const { _id, isActivated } = user.save();

    if (isActivated) {
      userpool.push(_id);
    }
  }

  for (let i = 0; i < randnumGuests; i++) {
    const guest = new GuestModel();
    guest.name = `${faker.name.firstName()} ${faker.name.lastName()}`;
    guest.email = faker.internet.email();
    guest.phone = faker.phone.phoneNumber();
    guest.organization = faker.company.companyName();
    guest.host = faker.random.arrayElement(userpool);
    await guest.save();
  }

  for (let i = 0; i < randnumRooms; i++) {
    const room = new RoomModel();
    room.location = faker.random.arrayElement(roomspool);
    room.name = faker.name.jobArea();

    await room.save();
  }

  console.log(`Created ${randnumLocations} locations`);
  console.log(`Created ${randnumGuests} Guests`);
  console.log(`Created ${randnumUsers} Users`);
  console.log(`Created ${randnumRooms} Rooms`);
  console.log('Database seeded!!');
}

generateData();
