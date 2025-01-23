import "./main.css"

import { LoginRequest } from "#/requests/auth.request";
import { loginSchema } from "#/validation/auth-validation.schema"
import { axiosInstance } from "./config/axios.config";
import AuthService from "./services/auth.service";
import StorageService from "./services/storage.service";
import { handleServerError } from "./handlers/error.handlers";
import { FormValidator } from "./validation/form.validator";

const authService = new AuthService(axiosInstance, new StorageService);

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form") as HTMLFormElement;
    const validator = new FormValidator<LoginRequest>(form, loginSchema);

    form?.addEventListener("submit", e => {
        e.preventDefault();

        if (!validator.valid())
            validator.forceValidation()

        if (validator.valid()) {
            authService.login(validator.validated() as LoginRequest)
                .then(() => window.location.href = "/user/profile")
                .catch(error => handleServerError(error as Error))
        }
    })
})