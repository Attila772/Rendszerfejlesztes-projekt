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
import {
  deleteQualification,
  listQualifications,
} from "../../shared/network/qualification.api";

type Props = {
  token?: any;
};

const Qualifications = ({ token }: Props) => {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const { setHeaderButtons } = useHeader();
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const isQualificationAdmin = hasAuthority(
    (token as AuthenticatedUser)?.level,
    "QUALIFICATION_ADMIN"
  );

  const qualificationQuery = useQuery(
    ["qualifications", page, toggleRefetch],
    async () => {
      const data = await listQualifications();
      return data;
    }
  );

  useEffect(() => {
    isQualificationAdmin &&
      setHeaderButtons(
        <Box display="flex" gridGap={12}>
          <Button component={Link} to="/qualification-create">
            {t("common.button.createAction.qualification")}
          </Button>
        </Box>
      );
    return () => {
      setHeaderButtons(null);
    };
  }, [isQualificationAdmin]);

  const columnsAdmin: GridColDef[] = [
    {
      field: "name",
      headerName: t("common.table.name"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: " ",
      headerName: t("common.table.actions"),
      headerAlign: "right",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: ({ row }: GridRenderCellParams) => (
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Tooltip
            title={t("common.button.deleteAction.qualification").toString()}
          >
            <IconButton
              onClick={() => {
                deleteQualification(row.id);
                enqueueSnackbar(t("qualification.deleteSuccess.title"), {
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
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
  ];

  return (
    <Container maxWidth="xs">
      <SingleQueryTable
        query={qualificationQuery}
        columns={isQualificationAdmin ? columnsAdmin : columns}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </Container>
  );
};

export default Qualifications;
