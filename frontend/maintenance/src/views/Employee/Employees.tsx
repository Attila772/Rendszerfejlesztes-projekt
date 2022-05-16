import { Box, Button, Container, IconButton, Tooltip } from "@material-ui/core";
import { Edit } from "@mui/icons-material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import SingleQueryTable from "../../components/PageableTable/SingleQueryTable";
import { hasAuthority } from "../../shared/common/authorization";
import { COLORS } from "../../shared/common/constants";
import { AuthenticatedUser } from "../../shared/common/rolePermissions";
import { listQualifications } from "../../shared/network/qualification.api";
import { listEmployees } from "../../shared/network/user.api";

type Props = {
  token?: any;
};

const Employees = ({ token }: Props) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const { setHeaderButtons } = useHeader();
  const isEmployeeAdmin = hasAuthority(
    (token as AuthenticatedUser)?.level,
    "EMPLOYEE_ADMIN"
  );

  const employeeQuery = useQuery(["employees", page], async () => {
    const data = await listEmployees();
    return data;
  });

  const qualificationQuery = useQuery(
    ["qualificationsForEmployees"],
    async () => {
      const data = await listQualifications();
      return data;
    }
  );
  const qualifications = qualificationQuery.data?.Data
    ? Object.keys(qualificationQuery.data?.Data)?.map(
        (key: any) => qualificationQuery.data?.Data[key]
      )
    : [];

  useEffect(() => {
    isEmployeeAdmin &&
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
  }, [isEmployeeAdmin]);

  const columnsAdmin: GridColDef[] = [
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
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: ({ row }: GridRenderCellParams) =>
        t(`common.role.${row.level}`),
    },
    {
      field: "trade",
      headerName: t("common.table.trade"),
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: ({ row }: GridRenderCellParams) =>
        qualifications.find((qua) => qua.id === row.trade)?.name || "-",
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
        </Box>
      ),
    },
  ];

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
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: ({ row }: GridRenderCellParams) =>
        t(`common.role.${row.level}`),
    },
    {
      field: "trade",
      headerName: t("common.table.trade"),
      headerAlign: "right",
      align: "right",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: ({ row }: GridRenderCellParams) =>
        qualifications.find((qua) => qua.id === row.trade)?.name || "-",
    },
  ];

  return (
    <Container maxWidth="md">
      <SingleQueryTable
        query={employeeQuery}
        columns={isEmployeeAdmin ? columnsAdmin : columns}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </Container>
  );
};

export default Employees;
