import { Issue, Schedule, User } from "../../components/types";
import { SERVER_ADDRESS } from "../common/constants";

export type CreateScheduleRequest = {
  user: User;
  from_date: Date;
  length: number;
  state: string;
  task: Issue;
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
