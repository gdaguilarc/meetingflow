import mongoose from 'mongoose';

const { Schema } = mongoose;

const attendanceShema = new Schema({
  meeting: { type: Schema.Types.ObjectId, ref: 'meeting' },
  attendee: { type: Schema.Types.ObjectId }
});

export default mongoose.model('attendance', attendanceShema);
