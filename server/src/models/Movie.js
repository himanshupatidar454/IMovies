const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  posterUrl: { type: String, default: "" },
  backdropUrl: { type: String, default: "" },
  genre: [{ type: String }],
  language: { type: String, default: "Hindi" },
  durationMinutes: { type: Number, default: 140 },
  certificate: { type: String, default: "UA 13+" },
  releaseDate: Date,
  rating: { type: Number, min: 0, max: 10, default: 7.5 },
  featured: { type: Boolean, default: false }
}, { timestamps: true });
module.exports = mongoose.model("Movie", movieSchema);
