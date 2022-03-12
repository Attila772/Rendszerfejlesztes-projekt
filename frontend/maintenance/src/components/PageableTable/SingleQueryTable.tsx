import { makeStyles } from "@material-ui/core/styles";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  MuiEvent,
} from "@mui/x-data-grid";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { UseQueryResult } from "react-query";
import { COLORS } from "../../shared/common/constants";
import { GenericListResponse } from "../types";
import { huHU } from "./huHU";

type Props = {
  columns: GridColDef[];
  query: UseQueryResult<GenericListResponse<any>, unknown>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  onCellClick?: (
    params: GridCellParams,
    event: MuiEvent<SyntheticEvent<Element, Event>>
  ) => void;
};

const useStyles = makeStyles({
  root: {
    "& .MuiDataGrid-columnsContainer": {
      background: COLORS.mainGrey,
    },
    "& .MuiDataGrid-footerContainer": {
      background: COLORS.mainGrey,
    },
  },
});

const SingleQueryTable = ({
  query,
  columns,
  page,
  setPage,
  onCellClick,
}: Props) => {
  const classes = useStyles();

  return (
    <DataGrid
      className={classes.root}
      autoHeight
      localeText={huHU}
      loading={query.isFetching}
      error={query.isError ? true : undefined}
      rows={query.data?.items || []}
      columns={columns}
      page={page}
      pageSize={10}
      rowCount={query.data?.items?.length || 0}
      rowsPerPageOptions={[10, 20, 50, 100]}
      pagination
      paginationMode="client"
      onPageChange={setPage}
      disableColumnMenu
      disableSelectionOnClick
      onCellClick={onCellClick}
    />
  );
};

export default SingleQueryTable;
