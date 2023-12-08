import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api-berita-indonesia.vercel.app/cnbc",
});

export default axiosClient;
