import { Container, Grid } from "@material-ui/core";
import { format } from "date-fns";
import { hu } from "date-fns/locale";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import { useHeader } from "../../components/Layout/HeaderContext";
import { Category, Issue, Tool, User } from "../../components/types";
import { getCategoryById } from "../../shared/network/category.api";
import { getIssueById } from "../../shared/network/issue.api";
import { getScheduleById } from "../../shared/network/schedule.api";
import { getToolById } from "../../shared/network/tool.api";
import { getEmployeeById, listEmployees } from "../../shared/network/user.api";

const ScheduleDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setHeaderName } = useHeader();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  const scheduleQuery = useQuery(["getEmployeeByIdQuery", id], async () => {
    const data = await getScheduleById(id ? id.toString() : "");
    return data;
  });
  const schedule = scheduleQuery.data?.Data;

  const userQuery = useQuery(["userForScheduleDetails", schedule], async () => {
    const data = await getEmployeeById(
      schedule?.user_id ? schedule?.user_id : ""
    );
    return data;
  });
  const user = userQuery.data?.Data as User;
  const issueQuery = useQuery(
    ["issueForScheduleDetails", schedule],
    async () => {
      const data = await getIssueById(
        schedule?.task_id ? schedule?.task_id : "-1"
      );
      return data;
    }
  );
  const issue = issueQuery?.data?.Data as Issue;
  console.log(schedule);
  const toolQuery = useQuery(["toolForScheduleDetails", issue], async () => {
    const data = await getToolById(
      parseInt(issue?.item ? issue?.item.toString() : "-1")
    );
    return data;
  });
  const tool = toolQuery?.data?.Data as Tool;
  const categoryQuery = useQuery(
    ["categoryForScheduleDetails", tool],
    async () => {
      const data = await getCategoryById(
        parseInt(tool?.category ? (tool?.category as any)?.toString() : "-1")
      );
      return data;
    }
  );
  const category = categoryQuery?.data?.Data as Category;

  useEffect(() => {
    setHeaderName(t("schedule.actions.detailsTitle"));
    return () => {
      setHeaderName(null);
    };
  }, []);

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DetailsCard
            title={t("schedule.details.title")}
            detailData={[
              {
                name: t("common.table.user"),
                value: user?.email ? user.email : "-",
              },
              {
                name: t("common.table.from_date"),
                value: schedule?.from_date
                  ? format(new Date(schedule?.from_date), "Pp", { locale: hu })
                  : "-",
              },
              {
                name: t("common.table.length"),
                value: schedule?.length || "-",
              },
              {
                name: t("common.table.state"),
                value: schedule?.state
                  ? t(`common.issueStates.${schedule?.state}`)
                  : "-",
              },
              {
                name: t("common.table.task"),
                value: (issue as Issue)?.name || "-",
              },
            ]}
          />
        </Grid>
        {(tool as any)?.descript && (
          <Grid item xs={6}>
            <DetailsCard
              title={t("schedule.details.toolDescription")}
              singleData={(tool as any)?.descript}
            />
          </Grid>
        )}
        {(category as any)?.descript && (
          <Grid item xs={6}>
            <DetailsCard
              title={t("schedule.details.categoryDescription")}
              singleData={(category as any)?.descript}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ScheduleDetails;
