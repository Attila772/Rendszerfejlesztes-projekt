import { sha512 } from "js-sha512";
import { useState } from "react";
import { SERVER_ADDRESS } from "../common/constants";

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (loginRequest: LoginRequest) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      ...loginRequest,
      password: sha512(loginRequest.password),
    }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/login`, requestOptions);
  return response.json();
};

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage?.getItem("userToken");
    if (tokenString && tokenString !== "undefined") {
      console.log(tokenString);
      const userToken = JSON.parse(tokenString);
      return userToken?.token;
    } else {
      return null;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = async (loginRequest: LoginRequest) => {
    const { data: userToken } = await login(loginRequest);
    console.log(userToken);
    localStorage.setItem("userToken", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const deleteToken = () => {
    localStorage?.removeItem("userToken");
    setToken(getToken());
  };

  return {
    setToken: saveToken,
    removeToken: deleteToken,
    token,
  };
}
