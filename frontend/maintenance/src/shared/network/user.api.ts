import { sha512 } from "js-sha512";
import { Qualification, User } from "../../components/types";
import { SERVER_ADDRESS } from "../common/constants";

export type RegisterUserRequest = {
  email: string;
  password: string;
  trade: Qualification;
  level: string;
};

export const listEmployees = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(`${SERVER_ADDRESS}/sign-up`, requestOptions);
  return response.json();
};

export const registerUser = async (userRequest: RegisterUserRequest) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      email: userRequest.email,
      level: userRequest.level,
      password: sha512(userRequest.password),
      trade: userRequest.trade.id,
    }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/sign-up`, requestOptions);
  return response.json();
};

export const modifyEmployee = async (user: User) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      email: user.email,
      level: user.level,
      password: sha512(user.password),
      trade: user.trade.id,
    }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/user`, requestOptions);
  return response.json();
};

export const deleteEmployee = async (id: string | number) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ id: id }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/sign-up`, requestOptions);
  return response.json();
};

//get-by-id
export const getEmployeeById = async (id: string) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ id: id }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/user-by-id`, requestOptions);
  return response.json();
};
