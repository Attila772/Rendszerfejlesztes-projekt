import { Box, Button, Container, IconButton, Tooltip } from "@material-ui/core";
import { Delete, Edit } from "@mui/icons-material";
import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
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

type Props = {
  token?: any;
};

const Categories = ({ token }: Props) => {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
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
  const categories = categoryQuery.data?.Data
    ? Object.keys(categoryQuery.data?.Data)?.map(
        (key: any) => categoryQuery.data?.Data[key]
      )
    : [];

  useEffect(() => {
    isCategoryAdmin &&
      setHeaderButtons(
        <Box display="flex" gridGap={12}>
          <Button component={Link} to="/category-create">
            {t("common.button.createAction.category")}
          </Button>
        </Box>
      );

    return () => {
      setHeaderButtons(null);
    };
  }, [isCategoryAdmin]);

  const columnsAdmin: GridColDef[] = [
    {
      field: "name",
      headerName: t("common.table.name"),
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    } /*
    {
      field: "isExceptional",
      headerName: t("common.table.isExceptional"),
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: ({ row }: GridRenderCellParams) => (
        <IconButton size="small" color="primary">
          {row.isExceptional ? <CheckCircleOutline /> : <BlockOutlined />}
        </IconButton>
      ),
    },*/,
    {
      field: "norma_time",
      headerName: t("common.table.normaTimeInHours"),
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "interval",
      headerName: t("common.table.interval"),
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: ({ row }: GridRenderCellParams) =>
        t(`common.interval.${row.interval}`),
    },
    {
      field: "parent_id",
      headerName: t("common.table.parentCategory"),
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      valueGetter: ({ row }: GridValueGetterParams) =>
        row.parent_id === -1
          ? t("category.noParent")
          : categories.find((category) => category.id === row.parent_id)?.name,
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
    } /*
    {
      field: "isExceptional",
      headerName: t("common.table.isExceptional"),
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: ({ row }: GridRenderCellParams) => (
        <IconButton size="small" color="primary">
          {row.isExceptional ? <CheckCircleOutline /> : <BlockOutlined />}
        </IconButton>
      ),
    },*/,
    {
      field: "norma_time",
      headerName: t("common.table.normaTimeInHours"),
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "interval",
      headerName: t("common.table.interval"),
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: ({ row }: GridRenderCellParams) =>
        t(`common.interval.${row.interval}`),
    },
    {
      field: "parent_id",
      headerName: t("common.table.parentCategory"),
      headerAlign: "right",
      align: "right",
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
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </Container>
  );
};

export default Categories;
