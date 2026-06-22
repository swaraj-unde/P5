import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Address = mongoose.model("Address", AddressSchema);
