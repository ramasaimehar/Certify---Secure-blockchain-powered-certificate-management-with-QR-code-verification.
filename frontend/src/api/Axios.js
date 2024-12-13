import axios from "axios";

const instance = axios.create({
  baseURL: "mongodb://localhost:27017",
});

export default instance;