import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter product name."],
      maxLength: [200, "Prodcut name cannot be more that 200"],
    },
    price: {
      type: Number,
      required: [true, "please enter product Price."],
      maxLength: [5, "Product price cannot exceed 5 characters"],
    },
    description: {
      type: String,
      required: [true, "please enter product description."],
    },
    rating: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "please enter product category."],
      enum: [
        "Laptops",
        "Electronics",
        "Cameras",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Sports",
        "Home",
        "Outdoors",
      ],
      message: "Please Select correct category",
    },
    seller: {
      type: String,
      required: [true, "please enter product seller."],
    },
    stock: {
      type: Number,
      required: [true, "please enter product seller."],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: false,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: Number,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
