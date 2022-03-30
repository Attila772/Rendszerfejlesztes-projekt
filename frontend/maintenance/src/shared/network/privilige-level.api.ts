import { Role } from "../../components/types";
import { SERVER_ADDRESS } from "../common/constants";

export type CreatePriviligeRequest = {
  name: string;
};

export const listPriviligeLevels = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(`${SERVER_ADDRESS}/role`, requestOptions);
  return response.json();
};

export const createPriviligeLevel = async (
  priviligeRequest: CreatePriviligeRequest
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      ...priviligeRequest,
    }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/role`, requestOptions);
  return response.json();
};

export const modifyPriviligeLevel = async (priviligeLevel: Role) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ ...priviligeLevel }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/role`, requestOptions);
  return response.json();
};

export const deletePriviligeLevel = async (id: string | number) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ id: id }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/role`, requestOptions);
  return response.json();
};

//get-by-id
export const getPriviligeLevelById = async (id: string) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ id: id }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/role-by-id`, requestOptions);
  return response.json();
};