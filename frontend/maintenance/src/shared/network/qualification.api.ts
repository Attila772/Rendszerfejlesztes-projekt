import { SERVER_ADDRESS } from "../common/constants";

export type CreateQualificationRequest = {
  name: string;
};

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

export const createQualification = async (
  qualificationRequest: CreateQualificationRequest
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      ...qualificationRequest,
    }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/qualification`, requestOptions);
  return response.json();
};

export const deleteQualification = async (id: string | number) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ id: id }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/qualification`, requestOptions);
  return response.json();
};
