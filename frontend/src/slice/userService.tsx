import axios from "axios";
import { base_url } from "../utils/axiosConfig";

const register = async (userData: any) => {
  try {
    const response = await axios.post(`${base_url}user/register`, userData);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const login = async (userData: any) => {
  try {
    console.log("hi ax");
    console.log(userData);
    const response = await axios.post(`${base_url}user/login`, userData);

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const authService = { register, login };
