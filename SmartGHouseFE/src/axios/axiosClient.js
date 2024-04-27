import axios from "axios";

const axiosInst = axios.create({
    baseURL: "http://192.168.1.9:8080",
    // baseURL: "https://tvtak.onrender.com",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    }
})
export default axiosInst