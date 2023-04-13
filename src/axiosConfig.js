import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:9090/",
});

export default instance;