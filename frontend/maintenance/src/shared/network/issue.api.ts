import { sha512 } from "js-sha512";
import { SERVER_ADDRESS } from "../common/constants";

export const listIssues = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(`${SERVER_ADDRESS}/issue`, requestOptions);
  return response.json();
};
