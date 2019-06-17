import mongoose from 'mongoose';

const { Schema } = mongoose;

const applicationSchema = new Schema(
  {
    firstTimeSetup: {
      type: Boolean,
      default: false
    },
    organizationName: String,
    organizationAdmin: { type: mongoose.Types.ObjectId, ref: 'user' },
    designatedHost: { type: mongoose.Types.ObjectId, ref: 'user' },
    setupTime: { type: Date, default: Date.now() }
  },
  {
    collection: 'application'
  }
);

export default mongoose.model('application', applicationSchema);
