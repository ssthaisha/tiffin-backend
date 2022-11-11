import mongoose from "mongoose";

const driverSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    // categoriesAllowed: [{
    //   name: { type: String, required: false }
    // }
    // ],
    isVerified: {
      type: Boolean,
      requiered: true,
    },
    isActive: {
      type: Boolean,
      requiered: true,
    },
    latitude: {
      type: String,
      required: false,
    },
    longitude: {
      type: String,
      required: false,
    },
  },
  {
    timeStamps: true,
  }
);

driverSchema.methods.matchPassword = async function (enteredPassword) {
  return enteredPassword === this.password;
};

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;
