import { Box, Button, Container } from "@material-ui/core";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import SingleQueryTable from "../../components/PageableTable/SingleQueryTable";
import { hasAuthority } from "../../shared/common/authorization";
import { AuthenticatedUser } from "../../shared/common/rolePermissions";
import { listLogs } from "../../shared/network/log.api";

type Props = {
  token?: any;
};

const Logs = ({ token }: Props) => {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const { setHeaderButtons } = useHeader();
  const isLogAdmin = hasAuthority(
    (token as AuthenticatedUser)?.level,
    "LOG_ADMIN"
  );

  const logQuery = useQuery(["logs", page], async () => {
    const { data } = await listLogs();
    return data;
  });

  useEffect(() => {
    isLogAdmin &&
      setHeaderButtons(
        <Box display="flex" gridGap={12}>
          <Button component={Link} to="/log-create">
            {"Log hozzáadása"}
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
      headerName: "Név",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
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
  ];

  return (
    <Container maxWidth="xs">
      <SingleQueryTable
        query={logQuery}
        columns={isLogAdmin ? columnsAdmin : columns}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </Container>
  );
};

export default Logs;
