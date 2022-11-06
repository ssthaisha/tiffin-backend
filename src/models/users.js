import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
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
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    license: {
      type: String,
      required: false,
    },
    subscribedTo: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Chef",
    },
    subscriptionExpiryDate: {
      type: Date,
      required: false,
    },
  },
  {
    timeStamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
