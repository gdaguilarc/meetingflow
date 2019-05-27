import mongoose from 'mongose';

const { Schema } = mongoose;

const guestSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  host: { type: Schema.Types.ObjectId, ref: 'user' }
});

export default mongoose.model('guest', guestSchema);
