import axios from "axios";

const api = axios.create({
  baseURL: process.env.NODE_ENV !== "production" ? "https://simulador-memoria.herokuapp.com" : "https://simulador-memoria.herokuapp.com",
  headers: {
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "application/json"
  },
});

export default api;
