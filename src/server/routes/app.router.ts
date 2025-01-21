import { Router } from "express";
import AuthController from "@/controllers/auth.controller";

export const router = Router();

const auth = new AuthController();

router.get("/auth/login", auth.getLogin)