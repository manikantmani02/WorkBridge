import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { nanoid } from "nanoid";

const router = Router();

router.post("/intent", requireAuth, (_req, res) => {
  const clientSecret = nanoid();
  return res.json({ clientSecret, provider: "razorpay|stripe" });
});

export default router;
