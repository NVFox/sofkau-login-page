import { Request, Response, NextFunction } from "express";

export default function AsyncRequestHandler(handler: (req: Request, res: Response, next?: NextFunction) => Promise<void>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}