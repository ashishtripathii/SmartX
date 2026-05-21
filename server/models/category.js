const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    categoryImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Category", categorySchema);
