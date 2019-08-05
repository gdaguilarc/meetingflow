import mongoose from 'mongoose';

const { Schema } = mongoose;

const guestSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  organization: String,
  host: { type: Schema.Types.ObjectId, ref: 'user' },
  RegistrationDateTime: { type: Date, default: Date.now }
});

export default mongoose.model('guest', guestSchema);
