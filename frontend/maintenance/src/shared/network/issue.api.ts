import { Issue } from "../../components/types";
import { SERVER_ADDRESS } from "../common/constants";

export type CreateIssueRequest = {
  name: string;
  item: number;
  priority: number;
};

export const listIssues = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(`${SERVER_ADDRESS}/task`, requestOptions);
  return response.json();
};

export const createIssue = async (issueRequest: CreateIssueRequest) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      ...issueRequest,
    }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/task`, requestOptions);
  return response.json();
};

export const modifyIssue = async (issue: Issue) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ ...issue }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/task`, requestOptions);
  return response.json();
};
//get-by-id
export const getIssueById = async (id: string) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(
    `${SERVER_ADDRESS}/taskid/${id}`,
    requestOptions
  );
  return response.json();
};

export const deleteIssue = async (
  id: string | number,
  user_id: string | number
) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ id: id, user_id: user_id }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/task`, requestOptions);
  return response.json();
};
