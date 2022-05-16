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
  deleteLocation,
  listLocations,
} from "../../shared/network/location.api";

type Props = {
  token?: any;
};

const Locations = ({ token }: Props) => {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const { setHeaderButtons } = useHeader();
  const { enqueueSnackbar } = useSnackbar();
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const isLocationAdmin = hasAuthority(
    (token as AuthenticatedUser)?.level,
    "LOCATION_ADMIN"
  );

  const locationQuery = useQuery(
    ["locations", page, toggleRefetch],
    async () => {
      const data = await listLocations();
      return data;
    }
  );

  useEffect(() => {
    isLocationAdmin &&
      setHeaderButtons(
        <Box display="flex" gridGap={12}>
          <Button component={Link} to="/location-create">
            {t("common.button.createAction.location")}
          </Button>
        </Box>
      );
    return () => {
      setHeaderButtons(null);
    };
  }, [isLocationAdmin]);

  const columnsAdmin: GridColDef[] = [
    {
      field: "building",
      headerName: t("common.table.building"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "room",
      headerName: t("common.table.room"),
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
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
          <Tooltip title={t("common.button.deleteAction.location").toString()}>
            <IconButton
              onClick={() => {
                deleteLocation(row.id);
                enqueueSnackbar(t("location.deleteSuccess.title"), {
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
      field: "building",
      headerName: t("common.table.building"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "room",
      headerName: t("common.table.room"),
      headerAlign: "right",
      align: "right",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
  ];

  return (
    <Container maxWidth="sm">
      <SingleQueryTable
        query={locationQuery}
        columns={isLocationAdmin ? columnsAdmin : columns}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </Container>
  );
};

export default Locations;
