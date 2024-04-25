import axios from "axios";

const axiosInst = axios.create({
    baseURL: "http://172.20.10.2:8080",
    // baseURL: "https://tvtak.onrender.com",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    }
})
export default axiosInst