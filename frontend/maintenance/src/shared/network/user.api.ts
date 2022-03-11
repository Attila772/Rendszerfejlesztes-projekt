import { sha512 } from "js-sha512";

export type RegisterUserRequest = {
  email: string;
  password1: string;
  password2: string;
  trade: string;
  level: string;
};

export const registerUser = async (userRequest: RegisterUserRequest) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      ...userRequest,
      password1: sha512(userRequest.password1),
      password2: sha512(userRequest.password2),
    }),
  };
  const response = await fetch("http://127.0.0.1:5000/sign-up", requestOptions);
  return response.json();
};
