import axios from "axios";

const API=axios.create({
   baseURL: "https://gwl-backend-2.onrender.com/api"||"http://localhost:4000/api",
  withCredentials: true,
})
export default API;

