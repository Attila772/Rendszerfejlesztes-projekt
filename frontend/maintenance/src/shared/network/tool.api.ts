import { Category, Location, Tool } from "../../components/types";
import { SERVER_ADDRESS } from "../common/constants";

export type CreateToolRequest = {
  name: string;
  category: Category | null;
  description?: string;
  location?: Location | null;
};

export const listTools = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(`${SERVER_ADDRESS}/item`, requestOptions);
  return response.json();
};

export const createTool = async (toolRequest: CreateToolRequest) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      category: toolRequest.category?.id,
      descript: toolRequest.description,
      location: toolRequest.location?.id,
      name: toolRequest.name,
    }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/item`, requestOptions);
  return response.json();
};

export const modifyTool = async (tool: Tool) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ ...tool }),
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

//get-by-id
export const getToolById = async (id: string) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ id: id }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/tool-by-id`, requestOptions);
  return response.json();
};
