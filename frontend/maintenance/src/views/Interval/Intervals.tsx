import { Box, Button, Container } from "@material-ui/core";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import SingleQueryTable from "../../components/PageableTable/SingleQueryTable";
import { listIntervals } from "../../shared/network/interval.api";
import { listQualifications } from "../../shared/network/qualification.api";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Név",
    sortable: false,
    disableColumnMenu: true,
    flex: 1,
  },
];

const Intervals = () => {
  const [page, setPage] = React.useState(0);
  const { setHeaderButtons } = useHeader();

  const intervalQuery = useQuery(["intervals", page], async () => {
    const { data } = await listIntervals();
    return data;
  });

  useEffect(() => {
    setHeaderButtons(
      <Box display="flex" gridGap={12}>
        <Button component={Link} to="/interval-create">
          {"Intervallum hozzáadása"}
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
        query={intervalQuery}
        columns={columns}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
};

export default Intervals;
