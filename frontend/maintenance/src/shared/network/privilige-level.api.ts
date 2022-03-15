import { SERVER_ADDRESS } from "../common/constants";

export const listPriviligeLevels = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(`${SERVER_ADDRESS}/role`, requestOptions);
  return response.json();
};
