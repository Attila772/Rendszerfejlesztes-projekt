import { Box, Button, Container } from "@material-ui/core";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import SingleQueryTable from "../../components/PageableTable/SingleQueryTable";
import { listEmployees } from "../../shared/network/user.api";

const columns: GridColDef[] = [
  {
    field: "email",
    headerName: "Email cím",
    sortable: false,
    disableColumnMenu: true,
    flex: 1,
  },
];

const Employees = () => {
  const [page, setPage] = React.useState(0);
  const { setHeaderButtons } = useHeader();

  const employeeQuery = useQuery(["employees", page], async () => {
    const { data } = await listEmployees();
    return data;
  });

  useEffect(() => {
    setHeaderButtons(
      <Box display="flex" gridGap={12}>
        <Button component={Link} to="/employee-create">
          {"Dolgozó hozzáadása"}
        </Button>
      </Box>
    );
    return () => {
      setHeaderButtons(null);
    };
  }, []);

  return (
    <Container maxWidth="xs">
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