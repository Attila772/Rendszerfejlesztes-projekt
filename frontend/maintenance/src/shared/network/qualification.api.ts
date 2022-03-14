import { SERVER_ADDRESS } from "../common/constants";

export const listQualifications = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(
    `${SERVER_ADDRESS}/qualification`,
    requestOptions
  );
  return response.json();
};
