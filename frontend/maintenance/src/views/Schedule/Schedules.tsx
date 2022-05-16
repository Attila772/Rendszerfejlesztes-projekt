import { Box, Container, IconButton, Tooltip } from "@material-ui/core";
import { Check, Close, Delete, Edit } from "@mui/icons-material";
import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import { hu } from "date-fns/locale";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import SingleQueryTable from "../../components/PageableTable/SingleQueryTable";
import { Schedule, User } from "../../components/types";
import { hasAuthority } from "../../shared/common/authorization";
import { COLORS } from "../../shared/common/constants";
import { AuthenticatedUser } from "../../shared/common/rolePermissions";
import { listIssues } from "../../shared/network/issue.api";
import {
  deleteSchedule,
  listMySchedules,
  listSchedules,
  modifySchedule,
} from "../../shared/network/schedule.api";
import { listEmployees } from "../../shared/network/user.api";

type Props = {
  token?: any;
};

const Schedules = ({ token }: Props) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const isScheduleAdmin = hasAuthority(
    (token as AuthenticatedUser)?.level,
    "SCHEDULE_ADMIN"
  );
  const isMySchedule = pathname === "/mySchedule";

  const scheduleQuery = useQuery(
    ["schedules", page, toggleRefetch],
    async () => {
      const data = await listSchedules();
      return data;
    },
    { enabled: !isMySchedule }
  );

  const myScheduleQuery = useQuery(
    ["mySchedules", page, toggleRefetch],
    async () => {
      const data = await listMySchedules((token as User)?.id);
      return data;
    },
    { enabled: true }
  );

  const userQuery = useQuery(["usersForSchedules"], async () => {
    const data = await listEmployees();
    return data;
  });
  const users = userQuery.data?.Data
    ? Object.keys(userQuery.data?.Data)?.map(
        (key: any) => userQuery.data?.Data[key]
      )
    : [];

  const issueQuery = useQuery(["issuesForSchedules"], async () => {
    const data = await listIssues();
    return data;
  });
  const issues = issueQuery.data?.Data
    ? Object.keys(issueQuery.data?.Data)?.map(
        (key: any) => issueQuery.data?.Data[key]
      )
    : [];

  async function modifyStatus(status: string, schedule: Schedule) {
    try {
      await modifySchedule({ ...schedule, state: status });
      enqueueSnackbar(
        t(
          `schedule.${
            status === "ACCEPTED" ? "accept" : "decline"
          }Success.title`
        ),
        {
          variant: "success",
        }
      );
    } catch {
      enqueueSnackbar(
        t(
          `schedule.${
            status === "ACCEPTED" ? "accept" : "decline"
          }Failure.title`
        ),
        {
          variant: "error",
        }
      );
    }
  }

  const columnsAdmin: GridColDef[] = [
    {
      field: "user_id",
      headerName: t("common.table.user"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      valueGetter: ({ row }: GridValueGetterParams) =>
        row.user_id
          ? users.find((user) => user.id === row.user_id)?.email
          : "-",
    },
    {
      field: "from_date",
      headerName: t("common.table.from_date"),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      flex: 1,
      valueGetter: ({ row }: GridValueGetterParams) =>
        row.from_date
          ? format(new Date(row.from_date), "Pp", { locale: hu }).toString()
          : "-",
    },
    {
      field: "length",
      headerName: t("common.table.length"),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "state",
      headerName: t("common.table.state"),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      flex: 1,
      valueGetter: ({ row }: GridValueGetterParams) =>
        row.state ? t(`common.issueStates.${row.state}`) : "-",
    },
    {
      field: "task_id",
      headerName: t("common.table.task"),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      flex: 1,
      valueGetter: ({ row }: GridValueGetterParams) =>
        row.task_id
          ? issues.find((task) => task.id === row.task_id)?.name
          : "-",
    },
    {
      field: " ",
      headerName: t("common.table.actions"),
      headerAlign: "right",
      sortable: false,
      disableColumnMenu: true,
      flex: 2,
      renderCell: ({ row }: GridRenderCellParams) => (
        <Box display="flex" justifyContent="flex-end" width="100%">
          {row?.state === "ASSIGNED" &&
            (token as User)?.id === row?.user_id &&
            isMySchedule && (
              <>
                <Tooltip
                  title={t("common.button.acceptAction.schedule").toString()}
                >
                  <IconButton
                    onClick={() => modifyStatus("ACCEPTED", row as Schedule)}
                    size="small"
                    color="primary"
                    style={{ margin: "0 8px" }}
                  >
                    <Check style={{ color: COLORS.mainLight }} />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={t("common.button.declineAction.schedule").toString()}
                >
                  <IconButton
                    onClick={() => modifyStatus("DECLINED", row as Schedule)}
                    size="small"
                    color="primary"
                    style={{ margin: "0 8px" }}
                  >
                    <Close style={{ color: COLORS.mainLight }} />
                  </IconButton>
                </Tooltip>
              </>
            )}
          {row?.state === "ACCEPTED" &&
            (token as User)?.id === row?.user_id &&
            isMySchedule && (
              <>
                <Tooltip
                  title={t("common.button.startAction.schedule").toString()}
                >
                  <IconButton
                    onClick={() => modifyStatus("IN_PROGRESS", row as Schedule)}
                    size="small"
                    color="primary"
                    style={{ margin: "0 8px" }}
                  >
                    <Check style={{ color: COLORS.mainLight }} />
                  </IconButton>
                </Tooltip>
              </>
            )}
          {row?.state === "IN_PROGRESS" &&
            (token as User)?.id === row?.user_id &&
            isMySchedule && (
              <>
                <Tooltip
                  title={t("common.button.finishAction.schedule").toString()}
                >
                  <IconButton
                    onClick={() => modifyStatus("COMPLETED", row as Schedule)}
                    size="small"
                    color="primary"
                    style={{ margin: "0 8px" }}
                  >
                    <Check style={{ color: COLORS.mainLight }} />
                  </IconButton>
                </Tooltip>
              </>
            )}
          <Tooltip title={t("common.button.modifyAction.schedule").toString()}>
            <IconButton
              component={Link}
              to={`/schedule-modify?id=${row.id}`}
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
            >
              <Edit style={{ color: COLORS.mainLight }} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("common.button.deleteAction.schedule").toString()}>
            <IconButton
              onClick={() => {
                deleteSchedule(row.id);
                enqueueSnackbar(t("schedule.deleteSuccess.title"), {
                  variant: "success",
                });
                setToggleRefetch(!toggleRefetch);
              }}
              size="small"
              color="primary"
              style={{ margin: "0 8px", color: COLORS.mainLight }}
            >
              <Delete style={{ color: COLORS.mainLight }} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "user_id",
      headerName: t("common.table.user"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      valueGetter: ({ row }: GridValueGetterParams) =>
        row.user_id
          ? users.find((user) => user.id === row.user_id)?.email
          : "-",
    },
    {
      field: "from_date",
      headerName: t("common.table.from_date"),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      flex: 1,
      valueGetter: ({ row }: GridValueGetterParams) =>
        row.from_date
          ? format(new Date(row.from_date), "Pp", { locale: hu }).toString()
          : "-",
    },
    {
      field: "normal_time",
      headerName: t("common.table.length"),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "state",
      headerName: t("common.table.state"),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      flex: 1,
      valueGetter: ({ row }: GridValueGetterParams) =>
        row.state ? t(`common.issueStates.${row.state}`) : "-",
    },
    {
      field: "task_id",
      headerName: t("common.table.task"),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      flex: 1,
      valueGetter: ({ row }: GridValueGetterParams) =>
        row.task_id
          ? issues.find((task) => task.id === row.task_id)?.name
          : "-",
    },
  ];

  return (
    <Container maxWidth="md">
      <SingleQueryTable
        query={isMySchedule ? myScheduleQuery : scheduleQuery}
        columns={isScheduleAdmin ? columnsAdmin : columns}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </Container>
  );
};

export default Schedules;
