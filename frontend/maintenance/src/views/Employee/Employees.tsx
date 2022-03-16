import { Box, Button, Container, IconButton, Tooltip } from "@material-ui/core";
import { Assignment, Delete, Edit } from "@mui/icons-material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import SingleQueryTable from "../../components/PageableTable/SingleQueryTable";
import { COLORS } from "../../shared/common/constants";
import { deleteEmployee, listEmployees } from "../../shared/network/user.api";

const Employees = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const { setHeaderButtons } = useHeader();
  const { enqueueSnackbar } = useSnackbar();
  const [toggleRefetch, setToggleRefetch] = useState(false);

  const employeeQuery = useQuery(
    ["employees", page, toggleRefetch],
    async () => {
      const data = await listEmployees();
      return data;
    }
  );

  useEffect(() => {
    setHeaderButtons(
      <Box display="flex" gridGap={12}>
        <Button component={Link} to="/employee-create">
          {t("common.button.createAction.employee")}
        </Button>
      </Box>
    );
    return () => {
      setHeaderButtons(null);
    };
  }, []);

  const columns: GridColDef[] = [
    {
      field: "email",
      headerName: t("common.table.email"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "level",
      headerName: t("common.table.level"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: " ",
      headerName: t("common.table.actions"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: ({ row }: GridRenderCellParams) => (
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Tooltip title={t("common.button.modifyAction.employee").toString()}>
            <IconButton
              component={Link}
              to={`/employee-modify?id=${row.id}`}
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
            >
              <Edit style={{ color: COLORS.mainLight }} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("common.button.deleteAction.employee").toString()}>
            <IconButton
              onClick={() => {
                deleteEmployee(row.id);
                enqueueSnackbar(t("employee.deleteSuccess.title"), {
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

  return (
    <Container maxWidth="sm">
      <SingleQueryTable
        query={employeeQuery}
        columns={columns}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
};

export default Employees;
