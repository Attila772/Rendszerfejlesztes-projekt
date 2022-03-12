import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowParams,
  GridSortModel,
  MuiEvent,
} from "@mui/x-data-grid";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { UseQueryResult } from "react-query";
import { COLORS } from "../../shared/common/constants";
import { GenericPageResponse } from "../types";
import { huHU } from "./huHU";

export type TableState = {
  page: number;
  pageSize: number;
  filterOpen: boolean;
  filterValue: string;
};

type Props = {
  sessionStorageKey: string;
  columns: GridColDef[];
  query: UseQueryResult<GenericPageResponse<any>, unknown>;
  tableState: TableState;
  setTableState: Dispatch<SetStateAction<TableState>>;
  setSortState: Dispatch<SetStateAction<string>>;
  onCellClick?: (
    params: GridCellParams,
    event: MuiEvent<SyntheticEvent<Element, Event>>
  ) => void;
  hideFooter?: boolean;
  getRowClassName?: (params: GridRowParams, details?: any) => string;
};

const useStyles = makeStyles({
  root: {
    "&.MuiDataGrid-root": {
      border: "unset",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: `1px solid ${COLORS.mainGrey}`,
    },
    "& .MuiDataGrid-columnsContainer": {
      background: COLORS.mainGrey,
    },
    "& .MuiDataGrid-footerContainer": {
      background: COLORS.mainGrey,
    },
    "& .monitoring-alert-error": {
      color: "#ad1524",
      fontWeight: "bold",
    },
  },
});

const PageableTable = ({
  sessionStorageKey,
  columns,
  query,
  tableState,
  setTableState,
  setSortState,
  onCellClick,
  hideFooter,
  getRowClassName,
}: Props) => {
  const classes = useStyles();

  const onSortChange = (sortModel: GridSortModel) => {
    if (sortModel?.[0]) {
      setSortState?.(`${sortModel?.[0]?.field},${sortModel?.[0]?.sort}`);
    } else {
      setSortState?.("");
    }
  };

  function onPageChange(newPage: number) {
    sessionStorage.setItem(
      `rap-${sessionStorageKey}-page-number`,
      JSON.stringify(newPage)
    );
    setTableState((prevState) => {
      return { ...prevState, page: newPage };
    });
  }

  function onPageSizeChange(pageSize: number) {
    sessionStorage.setItem(
      `rap-${sessionStorageKey}-page-size`,
      JSON.stringify(pageSize)
    );
    setTableState((prevState) => {
      return {
        ...prevState,
        page: 0,
        pageSize,
      };
    });
  }

  return (
    <Card style={{ width: "100%" }}>
      <DataGrid
        className={classes.root}
        autoHeight
        localeText={huHU}
        loading={query.isFetching}
        error={query.isError ? true : undefined}
        rows={query.data?.page.content || []}
        columns={columns}
        page={tableState.page}
        pageSize={tableState.pageSize}
        rowCount={query.data?.page?.totalElements || 0}
        rowsPerPageOptions={[10, 20, 50, 100]}
        pagination
        onCellClick={onCellClick}
        paginationMode="server"
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        sortingMode="server"
        onSortModelChange={onSortChange}
        disableColumnMenu
        disableSelectionOnClick
        getRowClassName={getRowClassName}
        hideFooter={!!hideFooter}
      />
    </Card>
  );
};

export default PageableTable;
