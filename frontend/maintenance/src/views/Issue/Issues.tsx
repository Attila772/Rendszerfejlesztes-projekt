import { Box, Button, Container, IconButton, Tooltip } from "@material-ui/core";
import { Delete, Person } from "@mui/icons-material";
import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import SingleQueryTable from "../../components/PageableTable/SingleQueryTable";
import { Issue, User } from "../../components/types";
import { hasAuthority } from "../../shared/common/authorization";
import { COLORS } from "../../shared/common/constants";
import { AuthenticatedUser } from "../../shared/common/rolePermissions";
import { deleteIssue, listIssues } from "../../shared/network/issue.api";
import { listTools } from "../../shared/network/tool.api";
import { listEmployees } from "../../shared/network/user.api";
import ScheduleModal from "../Schedule/ScheduleModal";

type Props = {
  token?: any;
};

export type ScheduleFormValues = {
  user: User | null;
};

const Issues = ({ token }: Props) => {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const { setHeaderButtons } = useHeader();
  const { enqueueSnackbar } = useSnackbar();
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const isIssueAdmin = hasAuthority(
    (token as AuthenticatedUser)?.level,
    "ISSUE_ADMIN"
  );

  const issueQuery = useQuery(["issues", page, toggleRefetch], async () => {
    const data = await listIssues();
    return data;
  });

  const toolQuery = useQuery(["toolsForIssues"], async () => {
    const data = await listTools();
    return data;
  });
  const tools = toolQuery.data?.Data
    ? Object.keys(toolQuery.data?.Data)?.map(
        (key: any) => toolQuery.data?.Data[key]
      )
    : [];

  const userQuery = useQuery(["usersForScheduleModal"], async () => {
    const data = await listEmployees();
    return data;
  });
  const users = userQuery.data?.Data
    ? Object.keys(userQuery.data?.Data)?.map(
        (key: any) => userQuery.data?.Data[key]
      )
    : [];

  useEffect(() => {
    isIssueAdmin &&
      setHeaderButtons(
        <Box display="flex" gridGap={12}>
          <Button component={Link} to="/issue-create">
            {"Feladat hozzáadása"}
          </Button>
        </Box>
      );
    return () => {
      setHeaderButtons(null);
    };
  }, [isIssueAdmin]);

  const columnsAdmin: GridColDef[] = [
    {
      field: "name",
      headerName: "Név",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "priority",
      headerName: "Prioritás",
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      flex: 1,
      valueGetter: ({ row }: GridValueGetterParams) =>
        row.priority === 1 ? t("issue.exceptional") : t("issue.notExceptional"),
    },
    {
      field: "item",
      headerName: "Eszköz",
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      flex: 1,
      valueGetter: ({ row }: GridValueGetterParams) =>
        tools.find((tool) => tool.id === row.item)?.name ?? row.item,
    },
    {
      field: " ",
      headerName: t("common.table.actions"),
      headerAlign: "right",
      align: "right",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: ({ row }: GridRenderCellParams) => (
        <>
          {hasAuthority(
            (token as AuthenticatedUser)?.level,
            "SCHEDULE_ADMIN"
          ) && (
            <Box display="flex" justifyContent="flex-end" width="100%">
              <Tooltip
                title={t(
                  "common.button.modifyAction.scheduleAddUser"
                ).toString()}
              >
                <IconButton
                  onClick={async () => {
                    setSelectedIssue(row as Issue);
                    setOpenScheduleModal(true);
                  }}
                  size="small"
                  color="primary"
                  style={{ margin: "0 8px" }}
                >
                  <Person style={{ color: COLORS.mainLight }} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          {hasAuthority((token as AuthenticatedUser)?.level, "ISSUE_ADMIN") && (
            <Tooltip title={t("common.button.deleteAction.issue").toString()}>
              <IconButton
                // disabled={row?.priority !== 1}
                onClick={() => {
                  deleteIssue(row.id, (token as User)?.id);
                  enqueueSnackbar(t("issue.deleteSuccess.title"), {
                    variant: "success",
                  });
                  setToggleRefetch(!toggleRefetch);
                }}
                size="small"
                color="primary"
                style={{ margin: "0 8px", color: COLORS.mainLight }}
              >
                <Delete
                  style={{
                    color: COLORS.mainLight,
                    //row?.priority !== 1 ? COLORS.lightGrey : COLORS.mainLight,
                  }}
                />
              </IconButton>
            </Tooltip>
          )}
        </>
      ),
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Név",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "priority",
      headerName: "Prioritás",
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      flex: 1,
      valueGetter: ({ row }: GridValueGetterParams) =>
        row.priority === 1 ? t("issue.exceptional") : t("issue.notExceptional"),
    },
    {
      field: "item",
      headerName: "Eszköz",
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      flex: 1,
      valueGetter: ({ row }: GridValueGetterParams) =>
        tools.find((tool) => tool.id === row.item)?.name ?? row.item,
    },
  ];

  return (
    <Container maxWidth="md">
      <SingleQueryTable
        query={issueQuery}
        columns={isIssueAdmin ? columnsAdmin : columns}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
      <ScheduleModal
        users={users}
        open={openScheduleModal}
        setOpen={setOpenScheduleModal}
        issue={selectedIssue}
      />
    </Container>
  );
};

export default Issues;
