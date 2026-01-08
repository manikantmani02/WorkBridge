import { Router } from "express";
import { requireAuth, AuthRequest } from "../middleware/auth";
import { nanoid } from "nanoid";

const router = Router();
const jobs: Array<{ id: string; title: string; description: string; role: string; status: string }> = [];

router.get("/", requireAuth, (req: AuthRequest, res) => {
  return res.json({ jobs });
});

router.post("/", requireAuth, (req: AuthRequest, res) => {
  const { title, description } = req.body as { title?: string; description?: string };
  if (!title) return res.status(400).json({ message: "title is required" });
  const job = {
    id: nanoid(),
    title,
    description: description || "",
    role: req.auth?.role || "customer",
    status: "open",
  };
  jobs.push(job);
  return res.status(201).json({ job });
});

export default router;
