import mongoose from 'mongoose';
import { setup } from './setup-db';

mongoose
  .connect(process.env.DB_HOST, { useNewUrlParser: true, useFindAndModify: false })
  .then(db => {
    console.log('Successfully connected to the database ...');
    console.log('Waiting for operations ...');
    setup();
  })
  .catch(err => {
    console.log(err);
  });
