import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true,
    maxLength: 6
  },
  addressline: {
    type: String,
    required: true
  }
});

const Address = mongoose.model('address', addressSchema);
export default Address;

