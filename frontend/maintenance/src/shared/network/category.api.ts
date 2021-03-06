import { gridDensityValueSelector } from "@mui/x-data-grid";
import { Category, Qualification } from "../../components/types";
import { SERVER_ADDRESS } from "../common/constants";

export type CreateCategoryRequest = {
  name: string;
  normaTimeInHours: number | string;
  intervalInDays?: number | null;
  parentCategory?: Category | null;
  description?: string;
  qualification: number;
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
      qualification: categoryRequest.qualification,
      parent_id: categoryRequest.parentCategory?.id ?? -1,
    }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/category`, requestOptions);
  return response.json();
};

export const modifyCategory = async (category: Category) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      id: category.id,
      name: category.name,
      norma_time: category.normaTimeInHours,
      interval: category.intervalInDays,
      descript: category.description,
      qualifications: category.qualification?.id,
      parent_id: category.parentCategory?.id ?? -1,
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

//get-by-id
export const getCategoryById = async (id: number) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(
    `${SERVER_ADDRESS}/categoryid/${id}`,
    requestOptions
  );
  return response.json();
};
