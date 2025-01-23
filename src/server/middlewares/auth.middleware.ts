import UnathorizedException from "@/exceptions/unauthorized.exception";
import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
    token: string;
}

export default function AuthMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.headers.authorization && !req.cookies.token)
            return req.accepts("html") 
                ? res.redirect("/auth/login") 
                : next(new UnathorizedException("Token not present"));

        const authorization = (req.headers.authorization || "Bearer " + req.cookies.token).trim();

        if (!authorization || !authorization.startsWith("Bearer"))
            return req.accepts("html") 
                ? res.redirect("/auth/login") 
                : next(new UnathorizedException("Token not present or invalid"));

        const token = authorization.substring(7).trim();

        if (!token)
            return req.accepts("html") 
                ? res.redirect("/auth/login") 
                : next(new UnathorizedException("Token not present or invalid"));
        
        (req as AuthenticatedRequest).token = token;

        next()
    }
}