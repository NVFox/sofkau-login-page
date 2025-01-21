import { Router } from "express";
import AuthController from "@/controllers/auth.controller";
import AsyncRequestHandler from "@/handlers/async-request.handler";
import { axiosInstance } from "@/config/axios.config";
import AuthService from "@/services/auth.service";

export const router = Router();

const authService = new AuthService(axiosInstance);
const auth = new AuthController(authService);

router.route("/auth/signup")
    .post(AsyncRequestHandler(async (req, res) => await auth.signup(req, res)))

router.route("/auth/login")
    .get(auth.login)
    .post(AsyncRequestHandler(async (req, res) => await auth.login(req, res)))