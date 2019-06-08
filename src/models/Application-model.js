import mongoose, { Types } from 'mongoose';

const { Schema } = mongoose;

const applicationSchema = new Schema({
  firstTimeSetup: {
    type: Boolean,
    default: false
  },
  organizationName: String,
  organizationAdmin: { type: Types.ObjectId, default: null },
  setupTime: { type: Date, default: Date.now() }
});

export default mongoose.model('application', applicationSchema);
