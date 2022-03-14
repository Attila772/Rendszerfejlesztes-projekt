import { SERVER_ADDRESS } from "../common/constants";

export const listLogs = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(`${SERVER_ADDRESS}/log`, requestOptions);
  return response.json();
};
