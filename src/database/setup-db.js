import mongoose from 'mongoose';
import App from '../models/Application-model';
import User from '../models/User-model';

/**
 * Creates the default table of the application
 */
export function setup() {
  mongoose.connection.db
    .listCollections({ name: 'application' })
    .next(async function(_err, collinfo) {
      if (!collinfo) {
        const app = new App();
        app.organizationName = 'Company';
        await app.save();
        console.log('Creating Application Schema ------- Success!! ');
      }
    });

  mongoose.connection.db.listCollections({ name: 'users' }).next(async function(_err, collinfo) {
    if (!collinfo) {
      const user = new User();
      user.name = 'Sin anfitrion';
      user.email = 'default@company.com';
      user.password = user.encryptPassword('12345');
      user.phone = '000000000000';
      user.position = 'Usuario predeterminado';
      user.office = 'default';
      user.isActivated = true;
      await user.save();
      console.log('Creating User Schema ------- Success!! ');
    }
  });
}

export default setup;
