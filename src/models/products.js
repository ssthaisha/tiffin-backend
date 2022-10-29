import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
}, {
  timeStamps: true,
})

const productSchema = mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Vendor'
  },

  productName: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  galleryImages: [
    {
      type: String,
      required: true,
    }
  ],
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: Object,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
    default: 0,
  },
  // reviews: [reviewSchema],
  // numReviews: {
  //   type: String,
  //   required: true,
  //   default: 0,
  // },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  isVendorActive: {
    type: Boolean,
    required: true,
  }
},
{
  timeStamps: true
});

const Product = mongoose.model('Product', productSchema)

export default Product;
