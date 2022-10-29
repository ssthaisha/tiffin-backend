import mongoose from 'mongoose';

// const reviewSchema = mongoose.Schema({
//   name: { type: String, required: true },
//   rating: { type: Number, required: true },
//   comment: { type: String, required: true },
// }, {
//   timeStamps: true,
// })

const promotionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  
},
{
  timeStamps: true
});

const Promotion = mongoose.model('Promotion', promotionSchema)

export default Promotion;
