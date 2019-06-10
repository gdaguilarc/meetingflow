import mongoose from 'mongoose';

const { Schema } = mongoose;

const applicationSchema = new Schema(
  {
    firstTimeSetup: {
      type: Boolean,
      default: false
    },
    organizationName: String,
    organizationAdmin: { type: mongoose.Types.ObjectId },
    setupTime: { type: Date, default: Date.now() }
  },
  {
    collection: 'application'
  }
);

export default mongoose.model('application', applicationSchema);
