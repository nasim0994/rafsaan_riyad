const mongoose = require("mongoose");
const FlashDeal = require("./flashDealModel");

const productSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      required: true,
    },
    galleries: {
      type: Array,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      ref: "SubCategory",
    },
    subSubCategory: {
      type: mongoose.Types.ObjectId,
      ref: "SubSubCategory",
    },
    brand: {
      type: String,
    },
    discount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// product cannot delete if flash sale is active
productSchema.pre("findOneAndDelete", async function (next) {
  const productId = this.getQuery()._id;
  const result = await FlashDeal.countDocuments({
    "flashProducts.product": productId,
  });

  if (result > 0) {
    const error = new Error(
      "Cannot delete the product as it is part of an active flash deal."
    );

    return next(error);
  }

  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
