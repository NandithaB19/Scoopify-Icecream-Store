dimport axios from "axios";

const instance = axios.create({
  baseURL: "https://scoopify-icecream-store.onrender.com", 
});

export default instance;
