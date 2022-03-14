import { sha512 } from "js-sha512";
import { SERVER_ADDRESS } from "../common/constants";

export const listCategories = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(`${SERVER_ADDRESS}/category`, requestOptions);
  return response.json();
};
