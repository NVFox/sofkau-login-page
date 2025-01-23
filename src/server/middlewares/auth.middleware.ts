import UnathorizedException from "@/exceptions/unauthorized.exception";
import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
    token: string;
}

export default function AuthMiddleware() {
    return (req: Request, _: Response, next: NextFunction) => {
        if (!req.headers.authorization)
            return next(new UnathorizedException("Token not present"));

        const authorization = req.headers.authorization.trim();

        if (!authorization || !authorization.startsWith("Bearer"))
            return next(new UnathorizedException("Token not present or invalid"));

        const token = authorization.substring(7).trim();

        if (!token)
            return next(new UnathorizedException("Token not present or invalid"));

        const request = req as AuthenticatedRequest;
        request.token = token;

        next()
    }
}