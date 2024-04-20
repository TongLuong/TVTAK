import axios from "axios";

const axiosInst = axios.create({
    baseURL: "http://192.168.2.56:8080",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    }
})
export default axiosInst