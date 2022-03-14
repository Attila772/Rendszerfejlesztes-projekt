import { sha512 } from "js-sha512";

export type RegisterUserRequest = {
  email: string;
  password: string;
  trade: string;
  level: string;
};

export const registerUser = async (userRequest: RegisterUserRequest) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      ...userRequest,
      password: sha512(userRequest.password),
    }),
  };
  const response = await fetch("http://127.0.0.1:5000/sign-up", requestOptions);
  return response.json();
};

export const listEmployees = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch("http://127.0.0.1:5000/user", requestOptions);
  return response.json();
};
