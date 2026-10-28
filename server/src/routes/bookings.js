const router = require("express").Router();
const crypto = require("crypto");
const Show = require("../models/Show");
const Booking = require("../models/Booking");
const { requireAuth } = require("../middleware/auth");

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { showId, seats } = req.body;
    if (!showId || !Array.isArray(seats) || seats.length < 1 || seats.length > 10)
      return res.status(400).json({ message: "Choose between 1 and 10 seats." });
    const show = await Show.findById(showId).populate("movie");
    if (!show) return res.status(404).json({ message: "Show not found." });
    const uniqueSeats = [...new Set(seats)];
    const available = new Set(show.seats.filter(s => s.status === "available").map(s => s.seatNumber));
    if (uniqueSeats.some(s => !available.has(s)))
      return res.status(409).json({ message: "One or more seats are no longer available. Refresh and try again." });
    show.seats.forEach(s => { if (uniqueSeats.includes(s.seatNumber)) s.status = "booked"; });
    await show.save();
    const booking = await Booking.create({
      reference: "IM" + crypto.randomBytes(4).toString("hex").toUpperCase(),
      user: req.user._id, show: show._id, movieTitle: show.movie.title,
      theatreName: show.theatreName, startsAt: show.startsAt,
      seats: uniqueSeats, totalAmount: uniqueSeats.length * show.price, paymentStatus: "demo-paid"
    });
    res.status(201).json({ booking });
  } catch (e) { next(e); }
});
router.get("/mine", requireAuth, async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (e) { next(e); }
});
module.exports = router;
