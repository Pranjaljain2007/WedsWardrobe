const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, unique: true }, // UUID allowed as product ID
    name: { type: String, required: true },
    price: { type: Number, required: true },
    gender: String,
    category: String,
    subcategory: String,
    imageUrl: String,
    description: String,
    stylistNotes: String,
    materialCare: String,
    size: String,
    ownerName: String,


    // Product status (dynamic)
    status: {
      type: String,
      enum: ["available", "booked", "rented", "unavailable"],
      default: "available"
    },


    //Track dates for rentals
    rentedFrom: Date,
    rentedTo: Date,
  },
  {
    timestamps: true,
    _id: false
  }
);

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
