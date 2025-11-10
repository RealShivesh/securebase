import express from "express";
import { signupUser, loginUser } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);


router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Profile access granted",
    user: req.user
  });
});


export default router;
