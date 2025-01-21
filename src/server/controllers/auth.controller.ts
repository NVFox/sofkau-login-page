import { Request, Response } from "express";

export default class AuthController {
    public getLogin(_: Request, res: Response) {
        res.render("login")
    }
}