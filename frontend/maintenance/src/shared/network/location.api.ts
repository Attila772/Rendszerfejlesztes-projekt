import { SERVER_ADDRESS } from "../common/constants";

export const listLocations = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(`${SERVER_ADDRESS}/location`, requestOptions);
  return response.json();
};
