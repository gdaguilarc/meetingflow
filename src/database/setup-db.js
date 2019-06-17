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
      app.organizationName = 'Company';
      await app.save();
      console.log('Creating Application Schema ------- Success!! ');
    }
  });
}

export default setup;
