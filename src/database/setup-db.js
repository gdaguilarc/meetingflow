import mongoose from 'mongoose';
import App from '../models/Application-model';

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
}

export default setup;
