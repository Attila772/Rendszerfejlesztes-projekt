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
  deletePriviligeLevel,
  listPriviligeLevels,
} from "../../shared/network/privilige-level.api";

type Props = {
  token?: any;
};

const PriviligeLevels = ({ token }: Props) => {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(0);
  const { setHeaderButtons } = useHeader();
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const isRoleAdmin = hasAuthority(
    (token as AuthenticatedUser)?.level,
    "ROLE_ADMIN"
  );

  const priviligeLevelQuery = useQuery(
    ["priviligelevel", page, toggleRefetch],
    async () => {
      const { data } = await listPriviligeLevels();
      return data;
    }
  );

  useEffect(() => {
    isRoleAdmin &&
      setHeaderButtons(
        <Box display="flex" gridGap={12}>
          <Button component={Link} to="/priviligelevel-create">
            {t("common.button.createAction.priviligeLevel")}
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
      headerName: t("common.table.name"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: " ",
      headerName: t("common.table.actions"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: ({ row }: GridRenderCellParams) => (
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Tooltip
            title={t("common.button.modifyAction.priviligeLevel").toString()}
          >
            <IconButton
              component={Link}
              to={`/priviligelevel-modify?id=${row.id}`}
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
            >
              <Edit style={{ color: COLORS.mainLight }} />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={t("common.button.deleteAction.priviligeLevel").toString()}
          >
            <IconButton
              onClick={() => {
                deletePriviligeLevel(row.id);
                enqueueSnackbar(t("priviligeLevel.deleteSuccess.title"), {
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
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
  ];

  return (
    <Container maxWidth="xs">
      <SingleQueryTable
        query={priviligeLevelQuery}
        columns={isRoleAdmin ? columnsAdmin : columns}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
};

export default PriviligeLevels;
