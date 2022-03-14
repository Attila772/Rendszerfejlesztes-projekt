import { t } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import { registerUser, RegisterUserRequest } from "../shared/network/user.api";

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <h2
      onClick={async () => {
        const response = await registerUser({
          email: "asd@gmail.com",
          password: "asd123",
          level: "1",
          trade: "",
        } as RegisterUserRequest).catch((error) => console.log(error));
        console.log(response);
      }}
    >
      {t("drawer.dashboard")}
    </h2>
  );
};

export default Dashboard;
