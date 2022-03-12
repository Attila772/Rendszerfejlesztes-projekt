import React from "react";
import { registerUser, RegisterUserRequest } from "../shared/network/user.api";

const Dashboard = () => {
  return (
    <h2
      onClick={async () => {
        const response = await registerUser({
          email: "asd@gmail.com",
          password1: "asd123",
          password2: "asd123",
          level: "1",
          trade: "",
        } as RegisterUserRequest);
        console.log(response);
      }}
    >
      Dashboard
    </h2>
  );
};

export default Dashboard;
