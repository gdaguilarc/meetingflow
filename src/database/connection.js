import mongoose from 'mongoose';

mongoose
  .connect(process.env.DB_HOST, { useNewUrlParser: true })
  .then(db => {
    console.log('Successfully connected to the database ...');
    console.log('Waiting for operations ...');
  })
  .catch(err => {
    console.log(err);
  });
