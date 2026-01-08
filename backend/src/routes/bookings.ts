import { Router } from "express";
import { requireAuth, AuthRequest } from "../middleware/auth";
import { nanoid } from "nanoid";

const router = Router();
const bookings: Array<{ id: string; jobId: string; customer: string; worker?: string; status: string }> = [];

router.post("/", requireAuth, (req: AuthRequest, res) => {
  const { jobId } = req.body as { jobId?: string };
  if (!jobId) return res.status(400).json({ message: "jobId required" });
  const booking = {
    id: nanoid(),
    jobId,
    customer: req.auth?.userId || "",
    status: "requested",
  };
  bookings.push(booking);
  return res.status(201).json({ booking });
});

router.patch("/:id/status", requireAuth, (req: AuthRequest, res) => {
  const { id } = req.params;
  const { status } = req.body as { status?: string };
  const allowed = ["requested", "accepted", "in-progress", "completed", "cancelled"];
  if (!status || !allowed.includes(status)) return res.status(400).json({ message: "invalid status" });
  const booking = bookings.find((b) => b.id === id);
  if (!booking) return res.status(404).json({ message: "booking not found" });
  booking.status = status;
  return res.json({ booking });
});

export default router;
