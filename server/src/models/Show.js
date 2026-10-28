const mongoose = require("mongoose");
const showSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  theatreName: { type: String, required: true },
  screenName: { type: String, default: "Screen 1" },
  city: { type: String, default: "Your City" },
  startsAt: { type: Date, required: true },
  price: { type: Number, required: true, min: 0 },
  seats: [{
    seatNumber: String,
    row: String,
    status: { type: String, enum: ["available", "booked"], default: "available" }
  }]
}, { timestamps: true });
module.exports = mongoose.model("Show", showSchema);
