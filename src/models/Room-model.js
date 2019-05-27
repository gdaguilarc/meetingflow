import mongoose from 'mongoose';

const { Schema } = mongoose;

const roomSchema = new Schema({
  location: { type: Schema.Types.ObjectId, ref: 'location' },
  name: String,
  busy: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('room', roomSchema);
