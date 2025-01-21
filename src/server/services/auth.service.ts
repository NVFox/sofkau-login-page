import { LoginRequest, SignupRequest } from "#/requests/auth.request";
import { LoggedInResponse } from "#/responses/auth.response";
import { Axios } from "axios";

export default class AuthService {
    public constructor(
        private axios: Axios
    ) {}

    public async signup(signupRequest: SignupRequest) {
        const response = await this.axios
            .post<LoggedInResponse>("/auth/signup", signupRequest);

        return response.data;
    }

    public async login(loginRequest: LoginRequest) {
        const response = await this.axios
            .post<LoggedInResponse>("/auth/login", loginRequest);

        return response.data;
    }
}