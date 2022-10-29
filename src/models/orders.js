import mongoose from 'mongoose';

// const reviewSchema = mongoose.Schema({
//   name: { type: String, required: true },
//   rating: { type: Number, required: true },
//   comment: { type: String, required: true },
// }, {
//   timeStamps: true,
// })

const orderSchema = mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'User'
  // },

  orderItems: [{
    name: { type: String, required: true },
    quantity: { type: String, required: true },
    payPrice: { type: String, required: true },
    image: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId,
       required: true,
      ref: 'Product'
     },
    vendorId: { type: mongoose.Schema.Types.ObjectId,
      required: true,
     ref: 'Vendor'
    },
  }],
  vendors: [{ type: mongoose.Schema.Types.ObjectId,
    required: true,
   ref: 'Vendor'
  }],
  name: {
    type: String,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
    // address: { type: String, required: true },
    // city: { type: String, required: true },
    // postalCode: { type: String, required: true },
    // country: { type: String, required: true },
  },
  contactNo: {
    type: String,
    required: true,
  },
  // paymentMethod: {
  //   id: { type: String },
  //   status: { type: String },
  //   update_time: { type: String },
  //   email_address: { type: String }
  // },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    // required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  date: {
    type: Date,
    required: true,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
},
{
  timeStamps: true
});

// OrderSchema.methods.getTimeStamp = async function(id) {
//   return ObjectId
// }

const Order = mongoose.model('Order', orderSchema)

export default Order;
