import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    title: String,
    image: String,
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false },
);

const AddressSchema = new mongoose.Schema(
  {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  { _id: false },
);

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    cartId: {
      type: String,
    },

    cartItems: [OrderItemSchema],

    addressInfo: AddressSchema,

    orderStatus: {
      type: String,
      enum: ["pending", "inProcess", "inShipping", "delivered", "rejected"],
      default: "pending",
      index: true,
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "card", "upi", "paypal"],
      default: "cod",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
      index: true,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    orderDate: {
      type: Date,
      default: Date.now,
    },

    orderUpdateDate: {
      type: Date,
      default: Date.now,
    },

    paymentId: String,
    payerId: String,
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", OrderSchema);
