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
  deleteCategory,
  listCategories,
} from "../../shared/network/category.api";
import useToken from "../../shared/network/login.api";

type Props = {
  token?: any;
};

const Categories = ({ token }: Props) => {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(0);
  const { setHeaderButtons } = useHeader();
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const isCategoryAdmin = hasAuthority(
    (token as AuthenticatedUser)?.level,
    "CATEGORY_ADMIN"
  );

  const categoryQuery = useQuery(
    ["categories", page, toggleRefetch],
    async () => {
      const data = await listCategories();
      return data;
    }
  );
  useEffect(() => {
    {
      isCategoryAdmin &&
        setHeaderButtons(
          <Box display="flex" gridGap={12}>
            <Button component={Link} to="/category-create">
              {t("common.button.createAction.category")}
            </Button>
          </Box>
        );
    }
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
      field: "isExceptional",
      headerName: t("common.table.isExceptional"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "normaTimeInHours",
      headerName: t("common.table.normaTimeInHours"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "interval",
      headerName: t("common.table.interval"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "parentCategory",
      headerName: t("common.table.parentCategory"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "description",
      headerName: t("common.table.description"),
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
        <>
          {hasAuthority(
            (token as AuthenticatedUser)?.level,
            "CATEGORY_ADMIN"
          ) && (
            <Box display="flex" justifyContent="flex-end" width="100%">
              <Tooltip
                title={t("common.button.modifyAction.category").toString()}
              >
                <IconButton
                  component={Link}
                  to={`/category-modify?id=${row.id}`}
                  size="small"
                  color="primary"
                  style={{ margin: "0 8px" }}
                >
                  <Edit style={{ color: COLORS.mainLight }} />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={t("common.button.deleteAction.category").toString()}
              >
                <IconButton
                  onClick={() => {
                    deleteCategory(row.id);
                    enqueueSnackbar(t("category.deleteSuccess.title"), {
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
          )}
        </>
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
    {
      field: "isExceptional",
      headerName: t("common.table.isExceptional"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "normaTimeInHours",
      headerName: t("common.table.normaTimeInHours"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "interval",
      headerName: t("common.table.interval"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "parentCategory",
      headerName: t("common.table.parentCategory"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "description",
      headerName: t("common.table.description"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
  ];

  return (
    <Container maxWidth="lg">
      <SingleQueryTable
        query={categoryQuery}
        columns={isCategoryAdmin ? columnsAdmin : columns}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
};

export default Categories;
