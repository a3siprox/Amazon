import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "http://localhost:5000",
	baseURL: "https://amazon-api-deployment-2vuj.onrender.com/",
});
