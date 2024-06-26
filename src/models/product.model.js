import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: [
    {
      type: String, //Cloudinary url
      required: true,
    },
  ],
  price: {
    type: Number,
    required: true,
  },

  gender: {
    type: String,
    lowercase : true
  },

  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
}, {timestamps : true});

export const Product = mongoose.model("Product", productSchema);
