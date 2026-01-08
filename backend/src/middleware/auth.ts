import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { UserRole } from "../models/User";

export interface AuthContext {
  userId: string;
  phone: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  auth?: AuthContext;
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Missing Authorization header" });
  }
  const token = header.replace(/Bearer\s+/i, "").trim();
  try {
    const payload = jwt.verify(token, env.jwtSecret) as AuthContext;
    req.auth = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
