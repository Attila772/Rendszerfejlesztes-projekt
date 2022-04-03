import { Box, Button, Container } from "@material-ui/core";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import SingleQueryTable from "../../components/PageableTable/SingleQueryTable";
import { hasAuthority } from "../../shared/common/authorization";
import { AuthenticatedUser } from "../../shared/common/rolePermissions";
import { listIssues } from "../../shared/network/issue.api";

type Props = {
  token?: any;
};

const Issues = ({ token }: Props) => {
  const [page, setPage] = React.useState(0);
  const { setHeaderButtons } = useHeader();
  const isIssueAdmin = hasAuthority(
    (token as AuthenticatedUser)?.level,
    "ISSUE_ADMIN"
  );

  const issueQuery = useQuery(["issues", page], async () => {
    const { data } = await listIssues();
    return data;
  });

  useEffect(() => {
    isIssueAdmin &&
      setHeaderButtons(
        <Box display="flex" gridGap={12}>
          <Button component={Link} to="/issue-create">
            {"Feladat hozzáadása"}
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
        query={issueQuery}
        columns={isIssueAdmin ? columnsAdmin : columns}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
};

export default Issues;
