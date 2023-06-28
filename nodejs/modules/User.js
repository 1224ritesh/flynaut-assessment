import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true // creating index
  },
  password: {
    type: String,
    required: false
  },
  type: {
    type: String,
    default: 'user'
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const User = mongoose.model('users', userSchema);
export default User;
