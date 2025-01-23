import { Axios } from "axios";
import StorageService from "./storage.service";
import { LoginRequest, SignupRequest } from "#/requests/auth.request"

export default class AuthService {
    public constructor(
        private axios: Axios,
        private storageService: StorageService
    ) {}

    public async signup(signupRequest: SignupRequest) {
        const { data } = await this.axios.post("/auth/signup", signupRequest);
        this.storageService.store("token", data.token);
    }

    public async login(loginRequest: LoginRequest) {
        const { data } = await this.axios.post("/auth/login", loginRequest);
        this.storageService.store("token", data.token);
    }
}