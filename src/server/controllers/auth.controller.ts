import AuthService from "@/services/auth.service";
import { loginSchema, signupSchema } from "@/validation/auth-validation.schema";
import { Request, Response } from "express";

export default class AuthController {
    public constructor(
        private authService: AuthService
    ) {}

    public async signup(req: Request, res: Response) {
        const signupRequest = await signupSchema.parseAsync(req.body);
        const response = await this.authService.signup(signupRequest);

        res.status(200).json(response);
    }

    public getLogin(_: Request, res: Response) {
        res.render("login")
    }

    public async login(req: Request, res: Response) {
        const loginRequest = await loginSchema.parseAsync(req.body);
        const response = await this.authService.login(loginRequest);

        res.status(200).json(response);
    }
}