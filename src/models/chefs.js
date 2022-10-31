import mongoose from "mongoose";

const chefSchema = mongoose.Schema(
  {
    fullName: {
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
    address: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      require: false,
    },
    // categoriesAllowed: [{
    //   name: { type: String, required: false }
    // }
    // ],
    isActive: {
      type: Boolean,
      requiered: true,
    },
  },
  {
    timeStamps: true,
  }
);

chefSchema.methods.matchPassword = async function (enteredPassword) {
  return enteredPassword === this.password;
};

const Chef = mongoose.model("Chef", chefSchema);

export default Chef;
