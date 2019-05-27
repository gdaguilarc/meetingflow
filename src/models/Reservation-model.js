import mongoose from 'mongoose';

const { Schema } = mongoose;

const reservationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  room: { type: Schema.Types.ObjectId, ref: 'room' },
  startTime: Date,
  finalTime: Date
});

export default mongoose.model('reservation', reservationSchema);
