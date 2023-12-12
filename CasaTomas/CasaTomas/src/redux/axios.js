import axios from "axios";

const instance = axios.create({
    baseURL: "casatomas-api.vercel.app/api",
    withCredentials: true,
})

export default instance;