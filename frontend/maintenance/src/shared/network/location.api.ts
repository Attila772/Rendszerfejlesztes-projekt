import { sha512 } from "js-sha512";

export type RegisterUserRequest = {
  email: string;
  password1: string;
  password2: string;
  trade: string;
  level: string;
};

export const listLocations = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(
    "http://127.0.0.1:5000/location",
    requestOptions
  );
  return response.json();
};
