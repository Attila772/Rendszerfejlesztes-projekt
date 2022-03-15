import { Box, Button, Container } from "@material-ui/core";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import SingleQueryTable from "../../components/PageableTable/SingleQueryTable";
import { listPriviligeLevels } from "../../shared/network/privilige-level.api";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Név",
    sortable: false,
    disableColumnMenu: true,
    flex: 1,
  },
];

const PriviligeLevels = () => {
  const [page, setPage] = React.useState(0);
  const { setHeaderButtons } = useHeader();

  const priviligeLevelQuery = useQuery(["logs", page], async () => {
    const { data } = await listPriviligeLevels();
    return data;
  });

  useEffect(() => {
    setHeaderButtons(
      <Box display="flex" gridGap={12}>
        <Button component={Link} to="/privilige-level-create">
          {"Hozzáférési szint hozzáadása"}
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
        query={priviligeLevelQuery}
        columns={columns}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
};

export default PriviligeLevels;
