const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    condition: {
      type: String,
      enum: ["New", "Used"],
      default: "Used",
    },

    location: {
      type: String,
      required: true,
    },

    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    contactNumber: {
      type: String,
      required: true,
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

productSchema.index({ price: 1 });
productSchema.index({ location: 1 });

module.exports = mongoose.model("Product", productSchema);
