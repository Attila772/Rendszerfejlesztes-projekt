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
import { GridRowIdGetter } from "@mui/x-data-grid/models/gridRows";

type Props = {
  columns: GridColDef[];
  query: UseQueryResult<GenericListResponse<any>, unknown>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  onCellClick?: (
    params: GridCellParams,
    event: MuiEvent<SyntheticEvent<Element, Event>>
  ) => void;
  getRowId?: GridRowIdGetter;
  pageSize?: number;
  setPageSize?: Dispatch<React.SetStateAction<number>>;
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
  getRowId,
  pageSize,
  setPageSize,
}: Props) => {
  const classes = useStyles();

  return (
    <DataGrid
      className={classes.root}
      autoHeight
      localeText={huHU}
      loading={query.isFetching}
      error={query.isError ? true : undefined}
      rows={
        query.data?.Data
          ? Object.keys(query.data?.Data)?.map(
              (key: any) => query.data?.Data[key]
            )
          : []
      }
      columns={columns}
      page={page}
      pageSize={pageSize ?? 10}
      rowsPerPageOptions={[10, 20, 50, 100]}
      onPageSizeChange={(newSize) => setPageSize?.(newSize)}
      pagination
      paginationMode="client"
      onPageChange={setPage}
      disableColumnMenu
      disableSelectionOnClick
      onCellClick={onCellClick}
      getRowId={getRowId}
    />
  );
};

export default SingleQueryTable;
