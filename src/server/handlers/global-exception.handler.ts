import { AxiosError } from "axios";
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

const HttpErrors = [ "ECONNREFUSED", "ETIMEDOUT" ]

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

        if (err instanceof AxiosError) {
            const response = err.response?.data;

            if (HttpErrors.includes(err?.code || "")) {
                problem.status = err?.status || problem.status;
                problem.detail = err?.code || problem.detail;
            } else {
                const { 
                    title = problem.title, 
                    status = problem.status, 
                    detail = problem.detail,
                    type: _type = "",
                    instance: _instance = "",
                    ...additional
                } = response;
    
                problem.title = title
                problem.status = status
                problem.detail = detail
                problem.meta = additional
            }
        }
    
        res.status(problem.status).json(problem);
    }
}