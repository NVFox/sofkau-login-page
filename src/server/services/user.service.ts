import { Axios } from "axios";
import { User } from "#/models/user.model";

export default class UserService {
    public constructor(
        private axios: Axios
    ) {}

    public async getUser(token: string) {
        const response = await this.axios.get<User>("/users", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    }
}