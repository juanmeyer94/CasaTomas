import axios from "axios";

const instance = axios.create({
    baseURL: "https://casatomas-api.vercel.app/api",
    withCredentials: true,
})

export default instance;
