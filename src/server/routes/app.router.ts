import { Router } from "express";
import AuthController from "@/controllers/auth.controller";
import AsyncRequestHandler from "@/handlers/async-request.handler";
import { axiosInstance } from "@/config/axios.config";
import AuthService from "@/services/auth.service";
import AuthMiddleware from "@/middlewares/auth.middleware";
import UserService from "@/services/user.service";
import UserController from "@/controllers/user.controller";

export const router = Router();

const authService = new AuthService(axiosInstance);
const userService = new UserService(axiosInstance);

const auth = new AuthController(authService);
const user = new UserController(userService);

router.use(/^((?!\/auth|assets|__webpack_hmr).)*$/, AuthMiddleware())

router.route("/auth/signup")
    .get(auth.getSignup)
    .post(AsyncRequestHandler(async (req, res) => await auth.signup(req, res)))

router.route("/auth/login")
    .get(auth.getLogin)
    .post(AsyncRequestHandler(async (req, res) => await auth.login(req, res)))

router.route("/user/profile")
    .get(AsyncRequestHandler(async (req, res) => await user.getProfile(req, res)))