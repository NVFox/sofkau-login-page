import { loginSchema } from "@/validation/auth-validation.schema";
import { Request, Response } from "express";
import { NextFunction } from "webpack-dev-middleware";

export default class AuthController {
    public getLogin(_: Request, res: Response) {
        res.render("login")
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const login = await loginSchema.parseAsync(req.body);
            res.status(200).json(login)
        } catch (error) {
            next(error)
        }
    }
}