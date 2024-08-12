import axios from "axios";
import config from "../config";

export async function register(firstName, lastName, email, password, role) {
  // body parameters
  const body = {
    firstName,
    lastName,
    email,
    password,
    role,
  };

  // make API call
  const response = await axios.post(`${config.url}/users/signup`, body);

  // read JSON data (response)
  return response.data;
}

export async function login(email, password) {
  // body parameters
  const body = {
    email,
    password,
  };

  // make API call
  const response = await axios.post(`${config.url}/users/signin`, body);

  // read JSON data (response)
  return response.data;
}
