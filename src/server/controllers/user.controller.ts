import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares/auth.middleware";
import UserService from "@/services/user.service";

export default class UserController {
    public constructor(
        private userService: UserService
    ) {}

    public async getProfile(req: Request, res: Response) {
        const request = req as AuthenticatedRequest;
        const response = await this.userService.getUser(request.token);

        res.render("profile", {
            user: response
        });
    }
}