import { SERVER_ADDRESS } from "../common/constants";

export const listTools = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(`${SERVER_ADDRESS}/item`, requestOptions);
  return response.json();
};
