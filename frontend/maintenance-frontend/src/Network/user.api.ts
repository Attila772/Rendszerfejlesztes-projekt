import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  GenericPageResponse,
  GenericResponse,
  GetAccountResponse,
  HttpResponse,
  User,
  UserRequest,
} from "../types";

const ENDPOINT = "/user";

export const userLogin = (
  email: string,
  password: string,
  rememberMe: boolean
) =>
  axios.post<{ item: string } & HttpResponse>(`${ENDPOINT}/login`, {
    email,
    password,
    rememberMe,
  });

export const listUsers = (
  page: number,
  size: number,
  search: string = "",
  sort: string = ""
) =>
  axios.post<GenericPageResponse<User>>(
    `${ENDPOINT}/get-page?page=${page}&size=${size}&search=${search}&sort=${sort}`
  ); //USER_ADMIN

export const getUserById = (param: number | string) =>
  axios.post<{ user: User }>(`${ENDPOINT}/get-by-id`, {
    param,
  });

export const getAccount = () =>
  axios.get<GetAccountResponse>(`${ENDPOINT}/account`); //ACCOUNT

export const registerUser = (param: UserRequest) =>
  axios.post(`${ENDPOINT}/create`, {
    param,
  });

export const modifyUser = (param: any, tenantId: number) =>
  axios.put(`${ENDPOINT}/modify`, {
    param,
    tenantId,
  });

export const activateUser = (password: string, token: string | null) =>
  axios.put(`${ENDPOINT}/activate`, { password, token });

export const postLogout = () => axios.post(`${ENDPOINT}/logout`);
