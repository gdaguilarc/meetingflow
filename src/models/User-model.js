import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  position: String,
  office: String,
  authority: { type: String, default: 'Basic' },
  isActivated: { type: Boolean, default: false }
});

// Method to encrypt the password applying 10 times the hashing algorithm
userSchema.methods.encryptPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Method to compare the encrypted passwords
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('user', userSchema);
