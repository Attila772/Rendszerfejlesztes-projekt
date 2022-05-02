import { Box, Container, IconButton, Tooltip } from "@material-ui/core";
import { Delete, Edit } from "@mui/icons-material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import SingleQueryTable from "../../components/PageableTable/SingleQueryTable";
import { hasAuthority } from "../../shared/common/authorization";
import { COLORS } from "../../shared/common/constants";
import { AuthenticatedUser } from "../../shared/common/rolePermissions";
import {
  deleteSchedule,
  listSchedules,
} from "../../shared/network/schedule.api";

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

  const columnsAdmin: GridColDef[] = [
    {
      field: "user",
      headerName: t("common.table.user"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "from_date",
      headerName: t("common.table.from_date"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "length",
      headerName: t("common.table.length"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "state",
      headerName: t("common.table.state"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "task",
      headerName: t("common.table.task"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
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
      field: "name",
      headerName: t("common.table.name"),
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
  ];

  return (
    <Container maxWidth="xs">
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
