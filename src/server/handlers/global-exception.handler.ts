import { Request, Response, NextFunction } from "express";
import { ZodError, ZodIssue } from "zod";

const formatValidationErrors = (issues: ZodIssue[]) => {
    return issues.reduce((errors, { path, message }) => {
        return {...errors, ...{ [path.join(".")]: message }};
    }, {})
}

type ProblemDetails = {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
    [field: string]: any
}

export default function GlobalExceptionHandler() {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (res.headersSent) 
            return next(err);

        if (!err)
            return next();

        const problem: ProblemDetails = {
            type: "about:blank",
            title: "Internal server error",
            status: 500,
            detail: err?.message ?? "Something went wrong",
            instance: req.path
        }
    
        if (err instanceof ZodError) {
            problem.title = "Validation error"
            problem.status = 400;
            problem.detail = `(${err.issues.length}) Errors were found in the request body`
            problem.errors = formatValidationErrors(err.issues);
        }
    
        res.status(problem.status).json(problem);
    }
}