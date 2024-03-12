import axios from "axios";

const instance = axios.create({
    baseURL: "https://casa-tomas-api.onrender.com/api",
    withCredentials: true,
})

export default instance;
