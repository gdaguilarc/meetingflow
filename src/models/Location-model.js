import mongoose from 'mongoose';

const { Schema } = mongoose;

const locationSchema = new Schema({
  firstLine: String,
  externalNumber: Number,
  internalNumber: String
});

export default mongoose.model('location', locationSchema);
