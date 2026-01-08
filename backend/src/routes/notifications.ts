import { Router } from "express";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/push", requireAuth, (req, res) => {
  const { message, phone } = req.body as { message?: string; phone?: string };
  if (!message) return res.status(400).json({ message: "message required" });
  console.log(`Notify ${phone || "user"}: ${message}`);
  return res.json({ status: "queued" });
});

export default router;
