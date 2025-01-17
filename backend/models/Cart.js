import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true, min: 1 },
        image: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      phone: {
        type: String,
        required: true,
        validate: {
          validator: (v) => /^\+?[0-9]{7,15}$/.test(v),
          message: (props) => `${props.value} is not a valid phone number!`,
        },
      },
    },
    itemsPrice: { type: Number, required: true, default: 0.0, min: 0 },
    totalPrice: { type: Number, required: true, default: 0.0, min: 0 },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },    
  },
  {
    timestamps: true,
  }
);

// Middleware pour calculer automatiquement les prix
orderSchema.pre("save", function (next) {
  this.itemsPrice = this.orderItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  this.totalPrice = this.itemsPrice; // Ajouter des frais supplémentaires si nécessaire
  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
