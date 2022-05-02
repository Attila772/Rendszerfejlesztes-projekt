import { Box, Container, IconButton, Tooltip } from "@material-ui/core";
import { Delete, Edit } from "@mui/icons-material";
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
import { Link } from "react-router-dom";
import SingleQueryTable from "../../components/PageableTable/SingleQueryTable";
import { hasAuthority } from "../../shared/common/authorization";
import { COLORS } from "../../shared/common/constants";
import { AuthenticatedUser } from "../../shared/common/rolePermissions";
import { listIssues } from "../../shared/network/issue.api";
import {
  deleteSchedule,
  listSchedules,
} from "../../shared/network/schedule.api";
import { listEmployees } from "../../shared/network/user.api";

type Props = {
  token?: any;
};

const Schedules = ({ token }: Props) => {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const isIssueAdmin = hasAuthority(
    (token as AuthenticatedUser)?.level,
    "ISSUE_ADMIN"
  );

  const scheduleQuery = useQuery(
    ["schedules", page, toggleRefetch],
    async () => {
      const data = await listSchedules();
      return data;
    }
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
      flex: 1,
      renderCell: ({ row }: GridRenderCellParams) => (
        <Box display="flex" justifyContent="flex-end" width="100%">
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
  ];

  return (
    <Container maxWidth="md">
      <SingleQueryTable
        query={scheduleQuery}
        columns={isIssueAdmin ? columnsAdmin : columns}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </Container>
  );
};

export default Schedules;
