import { Issue, Schedule, User } from "../../components/types";
import { SERVER_ADDRESS } from "../common/constants";

export type CreateScheduleRequest = {
  user: User;
  from_date: Date;
  length: number;
  state: string;
  task: Issue;
};

export const listSchedules = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(`${SERVER_ADDRESS}/schedule`, requestOptions);
  return response.json();
};

export const listMySchedules = async (id: number) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(
    `${SERVER_ADDRESS}/getschedule/${id}`,
    requestOptions
  );
  return response.json();
};

export const createSchedule = async (
  scheduleRequest: CreateScheduleRequest
) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      user_id: scheduleRequest.user.id,
      from_date: scheduleRequest.from_date.toISOString(),
      length: scheduleRequest.length,
      state: scheduleRequest.state,
      task_id: scheduleRequest.task.id,
    }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/schedule`, requestOptions);
  return response.json();
};

export const deleteSchedule = async (id: string | number) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ id: id }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/schedule`, requestOptions);
  return response.json();
};

export const modifySchedule = async (schedule: Schedule) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ ...schedule }),
  };
  const response = await fetch(`${SERVER_ADDRESS}/schedule`, requestOptions);
  return response.json();
};

//get-by-id
export const getScheduleById = async (id: string) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ id: id }),
  };
  const response = await fetch(
    `${SERVER_ADDRESS}/schedule-by-id`,
    requestOptions
  );
  return response.json();
};
