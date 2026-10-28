const router = require("express").Router();
const { requireAuth, requireAdmin } = require("../middleware/auth");
const User = require("../models/User");
const Movie = require("../models/Movie");
const Show = require("../models/Show");
const Booking = require("../models/Booking");
router.get("/summary", requireAuth, requireAdmin, async (_req, res, next) => {
  try {
    const [users, movies, shows, bookings, revenue] = await Promise.all([
      User.countDocuments(), Movie.countDocuments(), Show.countDocuments(),
      Booking.countDocuments(), Booking.aggregate([{ $group: { _id: null, total: { $sum: "$totalAmount" } } }])
    ]);
    res.json({ users, movies, shows, bookings, demoRevenue: revenue[0]?.total || 0 });
  } catch (e) { next(e); }
});
module.exports = router;
