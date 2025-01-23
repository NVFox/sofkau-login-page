import "./main.css"

import { SignupRequest } from "#/requests/auth.request";
import { signupSchema } from "#/validation/auth-validation.schema"
import { axiosInstance } from "./config/axios.config";
import AuthService from "./services/auth.service";
import StorageService from "./services/storage.service";
import { handleServerError } from "./handlers/error.handlers";
import { FormValidator } from "./validation/form.validator";

const authService = new AuthService(axiosInstance, new StorageService);

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signup-form") as HTMLFormElement;
    const validator = new FormValidator<SignupRequest>(form, signupSchema);

    form?.addEventListener("submit", e => {
        e.preventDefault();

        if (!validator.valid())
            validator.forceValidation()

        if (validator.valid()) {
            authService.signup(validator.validated() as SignupRequest)
                .catch(error => handleServerError(error as Error))
        }
    })
})