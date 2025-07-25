// models/Product.js

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    unique:true,
    required: true
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
