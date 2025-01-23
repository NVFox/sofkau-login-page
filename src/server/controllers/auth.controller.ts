import AuthService from "@/services/auth.service";
import { loginSchema, signupSchema } from "#/validation/auth-validation.schema";
import { Request, Response } from "express";

export default class AuthController {
    public constructor(
        private authService: AuthService
    ) {}

    public getSignup(_: Request, res: Response) {
        res.render("signup");
    }

    public async signup(req: Request, res: Response) {
        const signupRequest = await signupSchema.parseAsync(req.body);
        const response = await this.authService.signup(signupRequest);

        res.cookie("token", response.token, {
            httpOnly: true,
            secure: false,
            expires: new Date(Date.now() + response.expiresIn),
            sameSite: "strict"
        });

        res.status(200).json(response);
    }

    public getLogin(_: Request, res: Response) {
        res.render("login");
    }

    public async login(req: Request, res: Response) {
        const loginRequest = await loginSchema.parseAsync(req.body);
        const response = await this.authService.login(loginRequest);

        res.cookie("token", response.token, {
            httpOnly: true,
            secure: false,
            expires: new Date(Date.now() + response.expiresIn),
            sameSite: "strict"
        });

        res.status(200).json(response);
    }
}