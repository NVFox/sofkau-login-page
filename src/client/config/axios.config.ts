import axios from "axios";

export const axiosInstance = axios.create({
    "headers": {
        "Content-Type": "application/json"
    },
    "baseURL": process.env.BRIDGE_URL
})