import { Category, Location } from "../../components/types";
import { SERVER_ADDRESS } from "../common/constants";

export type CreateToolRequest = {
  name: string;
  category: Category;
  description?: string;
  location?: Location;
};

export const listTools = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(`${SERVER_ADDRESS}/item`, requestOptions);
  return response.json();
};

export const createTool = async (
  toolRequest: CreateToolRequest
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      ...toolRequest,
    }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/item`, requestOptions);
  return response.json();
};

export const deleteTool = async (id: string | number) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ id: id }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/item`, requestOptions);
  return response.json();
};
