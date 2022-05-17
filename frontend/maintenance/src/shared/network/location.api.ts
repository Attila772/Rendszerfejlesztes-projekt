import { Location } from "../../components/types";
import { SERVER_ADDRESS } from "../common/constants";

export type CreateLocationRequest = {
  building: string;
  room?: string;
};

export const listLocations = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(`${SERVER_ADDRESS}/location`, requestOptions);
  return response.json();
};

export const createLocation = async (
  locationRequest: CreateLocationRequest
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      ...locationRequest,
    }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/location`, requestOptions);
  return response.json();
};

export const modifyLocation = async (location: Location) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ ...location }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/location`, requestOptions);
  return response.json();
};

export const deleteLocation = async (id: string | number) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ id: id }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/location`, requestOptions);
  return response.json();
};

//get-by-id
export const getLocationById = async (id: string) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(
    `${SERVER_ADDRESS}/locationid/${id}`,
    requestOptions
  );
  return response.json();
};
