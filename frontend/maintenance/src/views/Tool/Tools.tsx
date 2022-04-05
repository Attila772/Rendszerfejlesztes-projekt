import { Box, Button, Container, IconButton, Tooltip } from "@material-ui/core";
import { Delete, Edit } from "@mui/icons-material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import SingleQueryTable from "../../components/PageableTable/SingleQueryTable";
import { hasAuthority } from "../../shared/common/authorization";
import { COLORS } from "../../shared/common/constants";
import { AuthenticatedUser } from "../../shared/common/rolePermissions";
import { deleteTool, listTools } from "../../shared/network/tool.api";

type Props = {
  token?: any;
};

const Tools = ({ token }: Props) => {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(0);
  const { setHeaderButtons } = useHeader();
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const isToolAdmin = hasAuthority(
    (token as AuthenticatedUser)?.level,
    "TOOL_ADMIN"
  );

  const toolQuery = useQuery(["tools", page, toggleRefetch], async () => {
    const data = await listTools();
    return data;
  });

  useEffect(() => {
    isToolAdmin &&
      setHeaderButtons(
        <Box display="flex" gridGap={12}>
          <Button component={Link} to="/tool-create">
            {t("common.button.createAction.tool")}
          </Button>
        </Box>
      );
    return () => {
      setHeaderButtons(null);
    };
  }, []);

  const columnsAdmin: GridColDef[] = [
    {
      field: "name",
      headerName: t("common.table.name"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "category",
      headerName: t("common.table.category"),
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "location",
      headerName: t("common.table.location"),
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
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
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Tooltip title={t("common.button.modifyAction.tool").toString()}>
            <IconButton
              component={Link}
              to={`/tool-modify?id=${row.id}`}
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
            >
              <Edit style={{ color: COLORS.mainLight }} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("common.button.deleteAction.tool").toString()}>
            <IconButton
              onClick={() => {
                deleteTool(row.id);
                enqueueSnackbar(t("tool.deleteSuccess.title"), {
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
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "category",
      headerName: t("common.table.category"),
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "location",
      headerName: t("common.table.location"),
      headerAlign: "right",
      align: "right",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
  ];

  return (
    <Container maxWidth="md">
      <SingleQueryTable
        query={toolQuery}
        columns={isToolAdmin ? columnsAdmin : columns}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
};

export default Tools;
