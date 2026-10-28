const router = require("express").Router();
const Show = require("../models/Show");
router.get("/", async (req, res, next) => {
  try {
    const filter = { startsAt: { $gte: new Date() } };
    if (req.query.movieId) filter.movie = req.query.movieId;
    const shows = await Show.find(filter).populate("movie", "title posterUrl durationMinutes language").sort({ startsAt: 1 }).limit(100);
    res.json({ shows });
  } catch (e) { next(e); }
});
router.get("/:id", async (req, res, next) => {
  try {
    const show = await Show.findById(req.params.id).populate("movie");
    if (!show) return res.status(404).json({ message: "Show not found." });
    res.json({ show });
  } catch (e) { next(e); }
});
module.exports = router;
