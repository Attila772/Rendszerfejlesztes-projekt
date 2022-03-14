import { Box, Button, Container } from "@material-ui/core";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import SingleQueryTable from "../../components/PageableTable/SingleQueryTable";
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

const Qualifications = () => {
  const [page, setPage] = React.useState(0);
  const { setHeaderButtons } = useHeader();

  const qualificationQuery = useQuery(["qualifications", page], async () => {
    const { data } = await listQualifications();
    return data;
  });

  useEffect(() => {
    setHeaderButtons(
      <Box display="flex" gridGap={12}>
        <Button component={Link} to="/qualification-create">
          {"Képesítés hozzáadása"}
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
        query={qualificationQuery}
        columns={columns}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
};

export default Qualifications;
