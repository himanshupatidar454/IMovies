const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  reference: { type: String, unique: true, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  show: { type: mongoose.Schema.Types.ObjectId, ref: "Show", required: true },
  movieTitle: String,
  theatreName: String,
  startsAt: Date,
  seats: [String],
  totalAmount: Number,
  paymentStatus: { type: String, enum: ["demo-paid", "pending"], default: "demo-paid" }
}, { timestamps: true });
module.exports = mongoose.model("Booking", bookingSchema);
