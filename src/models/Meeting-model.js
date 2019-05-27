import mongoose from 'mongoose';

const { Schema } = mongoose;

const meetingSchema = new Schema({
  date_time: Date,
  location: { type: Schema.Types.ObjectId, ref: 'location' },
  room: { type: Schema.Types.ObjectId, ref: 'room' },
  reason: String,
  reservation: { type: Schema.Types.ObjectId, ref: 'reservation' }
});

export default mongoose.model('meeting', meetingSchema);
