import axios from "axios";

const axiosInst = axios.create({
  baseURL: "http://192.168.1.13:8080",
  // baseURL: "https://tvtak.onrender.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInst;
