import { Box, Button, Container } from "@material-ui/core";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import SingleQueryTable from "../../components/PageableTable/SingleQueryTable";
import { listLogs } from "../../shared/network/log.api";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Név",
    sortable: false,
    disableColumnMenu: true,
    flex: 1,
  },
];

const Logs = () => {
  const [page, setPage] = React.useState(0);
  const { setHeaderButtons } = useHeader();

  const logQuery = useQuery(["logs", page], async () => {
    const { data } = await listLogs();
    return data;
  });

  useEffect(() => {
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

  return (
    <Container maxWidth="xs">
      <SingleQueryTable
        query={logQuery}
        columns={columns}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
};

export default Logs;
