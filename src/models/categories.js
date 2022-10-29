import mongoose from 'mongoose';

// const reviewSchema = mongoose.Schema({
//   name: { type: String, required: true },
//   rating: { type: Number, required: true },
//   comment: { type: String, required: true },
// }, {
//   timeStamps: true,
// })

const categorySchema = mongoose.Schema({
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  
},
{
  timeStamps: true
});

const Category = mongoose.model('Category', categorySchema)

export default Category;
