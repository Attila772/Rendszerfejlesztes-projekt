import React from "react";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  return <h2>{t("drawer.dashboard")}</h2>;
};

export default Dashboard;
