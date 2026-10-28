const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { requireAuth } = require("../middleware/auth");
const secret = () => process.env.JWT_SECRET || "development_only_change_me";
const publicUser = (u) => ({ id: u._id, name: u.name, email: u.email, role: u.role });
router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name?.trim() || !email?.trim() || !password || password.length < 8)
      return res.status(400).json({ message: "Name, email and a password of at least 8 characters are required." });
    if (await User.findOne({ email: email.toLowerCase().trim() }))
      return res.status(409).json({ message: "An account with this email already exists." });
    const user = await User.create({ name: name.trim(), email, passwordHash: await bcrypt.hash(password, 12) });
    const token = jwt.sign({ id: user._id }, secret(), { expiresIn: "7d" });
    res.status(201).json({ token, user: publicUser(user) });
  } catch (e) { next(e); }
});
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: (req.body.email || "").toLowerCase().trim() });
    if (!user || !(await bcrypt.compare(req.body.password || "", user.passwordHash)))
      return res.status(401).json({ message: "Email or password is incorrect." });
    const token = jwt.sign({ id: user._id }, secret(), { expiresIn: "7d" });
    res.json({ token, user: publicUser(user) });
  } catch (e) { next(e); }
});
router.get("/me", requireAuth, (req, res) => res.json({ user: publicUser(req.user) }));
module.exports = router;
