import { Log, User } from "../../components/types";
import { SERVER_ADDRESS } from "../common/constants";

export type CreateLogRequest = {
  status: string;
  dateTime: string;
  user?: User;
};

export const listLogs = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(`${SERVER_ADDRESS}/log`, requestOptions);
  return response.json();
};

export const createLog = async (
  logRequest: CreateLogRequest
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ ...logRequest, }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/log`, requestOptions);
  return response.json();
};

export const modifyLog = async (log: Log) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ ...log }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/log`, requestOptions);
  return response.json();
};

export const deleteLog = async (id: string | number) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ id: id }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/log`, requestOptions);
  return response.json();
};

//get-by-id
export const getLogById = async (id: string) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ id: id }),
  };
  const response = await fetch(
    `${SERVER_ADDRESS}/log-by-id`,
    requestOptions
  );
  return response.json();
};