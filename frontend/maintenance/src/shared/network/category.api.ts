import { Category } from "../../components/types";
import { SERVER_ADDRESS } from "../common/constants";

export type CreateCategoryRequest = {
  name: string;
  isExceptional: boolean;
  normaTimeInHours: number;
  intervalInDays?: string;
  parentCategory?: Category | null;
  description?: string;
};

export const listCategories = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(`${SERVER_ADDRESS}/category`, requestOptions);
  return response.json();
};

export const createCategory = async (
  categoryRequest: CreateCategoryRequest
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      name: categoryRequest.name,
      norma_time: categoryRequest.normaTimeInHours,
      interval: categoryRequest.intervalInDays,
      descript: categoryRequest.description,
      qualification: undefined,
      parent_id: categoryRequest.parentCategory?.id,
    }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/category`, requestOptions);
  return response.json();
};

export const deleteCategory = async (id: string | number) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ id: id }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/category`, requestOptions);
  return response.json();
};
