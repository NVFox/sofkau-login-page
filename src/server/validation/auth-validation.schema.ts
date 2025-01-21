import { z } from "zod";

import { 
    common_string_errors, 
    min_length_error, 
    max_length_error, 
    email_error
} from "./messages/validation-messages";

export const signupSchema = z.object({
    email: z.string(common_string_errors())
        .email(email_error()),
    firstName: z.string(common_string_errors())
        .min(3, min_length_error(3)),
    lastName: z.string(common_string_errors())
        .min(3, min_length_error(3)),
    username: z.string(common_string_errors())
        .min(3, min_length_error(3))
        .max(60, max_length_error(60)),
    password: z.string(common_string_errors())
        .min(8, min_length_error(8))
})

export const loginSchema = z.object({
    email: z.string(common_string_errors())
        .email(email_error()),
    password: z.string(common_string_errors())
        .min(8, min_length_error(8))
})