import { apiURL } from "@/constants";
import axios from "axios";

const axiosForum = axios.create({
  baseURL: apiURL
});

export default axiosForum;