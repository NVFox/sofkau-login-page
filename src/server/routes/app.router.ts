import { Router } from "express";
import AuthController from "@/controllers/auth.controller";
import AsyncRequestHandler from "@/handlers/async-request.handler";
import { axiosInstance } from "@/config/axios.config";
import AuthService from "@/services/auth.service";
import AuthMiddleware from "@/middlewares/auth.middleware";

export const router = Router();

const authService = new AuthService(axiosInstance);
const auth = new AuthController(authService);

router.use("/user/**", AuthMiddleware())

router.route("/auth/signup")
    .get(auth.getSignup)
    .post(AsyncRequestHandler(async (req, res) => await auth.signup(req, res)))

router.route("/auth/login")
    .get(auth.getLogin)
    .post(AsyncRequestHandler(async (req, res) => await auth.login(req, res)))