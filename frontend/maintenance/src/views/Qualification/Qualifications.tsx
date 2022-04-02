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
import { COLORS } from "../../shared/common/constants";
import {
  deleteQualification,
  listQualifications,
} from "../../shared/network/qualification.api";

const Qualifications = () => {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(0);
  const { setHeaderButtons } = useHeader();
  const [toggleRefetch, setToggleRefetch] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const qualificationQuery = useQuery(
    ["qualifications", page, toggleRefetch],
    async () => {
      const data = await listQualifications();
      return data;
    }
  );

  useEffect(() => {
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
  }, []);

  const columns: GridColDef[] = [
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
            title={t("common.button.modifyAction.qualification").toString()}
          >
            <IconButton
              component={Link}
              to={`/qualification-modify?id=${row.id}`}
              size="small"
              color="primary"
              style={{ margin: "0 8px" }}
            >
              <Edit style={{ color: COLORS.mainLight }} />
            </IconButton>
          </Tooltip>
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
