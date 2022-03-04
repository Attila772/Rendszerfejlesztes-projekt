import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage?.getItem("userToken");
    if (tokenString) {
      const userToken = JSON.parse(tokenString);
      return userToken?.token;
    } else {
      return null;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: any) => {
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
