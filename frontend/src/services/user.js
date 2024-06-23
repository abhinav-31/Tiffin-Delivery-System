import axios from "axios";
import config from "../config";

export async function register(
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  address,
  role,
  roleID
) {
  // body parameters
  const body = {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    address,
    role,
    roleID,
  };

  // make API call
  const response = await axios.post(`${config.url}/user/register`, body);

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
  const response = await axios.post(`${config.url}/user/login`, body);

  // read JSON data (response)
  // console.log(response);
  return response.data;
}
