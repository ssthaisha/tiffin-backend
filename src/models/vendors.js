import mongoose from 'mongoose';


const vendorSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  shopContactNo: {
    type: String,
    required: false,
  },
  shopEmail: {
    type: String,
    required: false,
  },
  shopVatNo: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  // categoriesAllowed: [{
  //   name: { type: String, required: false }
  // }
  // ],
  isActive: {
    type: Boolean,
    requiered: true,
  },
  isVerified: {
    type: Boolean,
    requiered: true,
  },
  verifiedAt: {
    type: Date,
  },
},
{
  timeStamps: true
});

vendorSchema.methods.matchPassword = async function(enteredPassword) {
  return  (enteredPassword === this.password)
}

const Vendor = mongoose.model('Vendor', vendorSchema)

export default Vendor;
