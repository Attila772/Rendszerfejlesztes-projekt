import { SERVER_ADDRESS } from "../common/constants";

export const listIntervals = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(`${SERVER_ADDRESS}/interval`, requestOptions);
  return response.json();
};
