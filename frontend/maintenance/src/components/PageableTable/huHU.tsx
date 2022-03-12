import { GridLocaleText } from "@mui/x-data-grid";

export const huHU: GridLocaleText = {
  toolbarExportPrint: "Export és nyomtatás",
  filterPanelLinkOperator: "FilterPanelKinkOperator",
  filterOperatorIsAnyOf: "filterOperatorIsAnyOf",
  checkboxSelectionSelectAllRows: "checkboxSelectionSelectAllRows",
  checkboxSelectionSelectRow: "checkboxSelectionSelectRow",
  checkboxSelectionUnselectAllRows: "checkboxSelectionUnselectAllRows",
  checkboxSelectionUnselectRow: "checkboxSelectionUnselectRow",
  actionsCellMore: "actionsCellMore",
  pinToLeft: "pinToLeft",
  pinToRight: "pinToRight",
  unpin: "unpin",
  treeDataCollapse: "treeDataCollapse",
  treeDataExpand: "treeDataExpand",
  treeDataGroupingHeaderName: "treeDataGroupingHeaderName",
  groupColumn: (name: string) => name,
  unGroupColumn: (name: string) => name,
  groupingColumnHeaderName: "groupingColumnHeaderName",
  expandDetailPanel: "expandDetailPanel",
  collapseDetailPanel: "collapseDetailPanel",

  // Root
  noRowsLabel: "Nincs megjeleníthető adat",
  noResultsOverlayLabel: "Nnics találat",
  errorOverlayDefaultLabel: "Hiba történt az adatok lekérése közben.",

  // Density selector toolbar button text
  toolbarDensity: "Density",
  toolbarDensityLabel: "Density",
  toolbarDensityCompact: "Compact",
  toolbarDensityStandard: "Standard",
  toolbarDensityComfortable: "Comfortable",

  // Columns selector toolbar button text
  toolbarColumns: "Oszlopok",
  toolbarColumnsLabel: "Oszlopok kiválasztása",

  // Filters toolbar button text
  toolbarFilters: "Szűrők",
  toolbarFiltersLabel: "Szűrők megjelenítése",
  toolbarFiltersTooltipHide: "Szűrők elrejtése",
  toolbarFiltersTooltipShow: "Szűrők megjelenítése",
  toolbarFiltersTooltipActive: (count) => `${count} aktív szűrő`,

  // Export selector toolbar button text
  toolbarExport: "Exportálás",
  toolbarExportLabel: "Exportálás",
  toolbarExportCSV: "Letöltés CSV-ben",

  // Columns panel text
  columnsPanelTextFieldLabel: "Keresés",
  columnsPanelTextFieldPlaceholder: "Oszlop neve",
  columnsPanelDragIconLabel: "Átrendezés",
  columnsPanelShowAllButton: "Összes",
  columnsPanelHideAllButton: "Egyik sem",

  // Filter panel text
  filterPanelAddFilter: "Szűrrő hozzáadása",
  filterPanelDeleteIconLabel: "Törlés",
  filterPanelOperators: "Operátorok",
  filterPanelOperatorAnd: "És",
  filterPanelOperatorOr: "Vagy",
  filterPanelColumns: "Oszlopok",
  filterPanelInputLabel: "Érték",
  filterPanelInputPlaceholder: "Érték",

  // Filter operators text
  filterOperatorContains: "tartalmaz",
  filterOperatorEquals: "egyenlő",
  filterOperatorStartsWith: "kezdődik",
  filterOperatorEndsWith: "végződik",
  filterOperatorIs: "pontosan",
  filterOperatorNot: "nem",
  filterOperatorAfter: "utána",
  filterOperatorOnOrAfter: "pontosan vagy utána",
  filterOperatorBefore: "előtte",
  filterOperatorOnOrBefore: "pontosan vagy előtte",
  filterOperatorIsEmpty: "üres",
  filterOperatorIsNotEmpty: "nem üres",

  // Filter values text
  filterValueAny: "bárrmi",
  filterValueTrue: "igaz",
  filterValueFalse: "hamis",

  // Column menu text
  columnMenuLabel: "Menü",
  columnMenuShowColumns: "Oszlopok",
  columnMenuFilter: "Szűrés",
  columnMenuHideColumn: "Elrejtés",
  columnMenuUnsort: "Nincs rendezés",
  columnMenuSortAsc: "Emelkedő sorrend",
  columnMenuSortDesc: "Csökkenő sorrend",

  // Column header text
  columnHeaderFiltersTooltipActive: (count) => `${count} aktív szűrő`,
  columnHeaderFiltersLabel: "Show filters",
  columnHeaderSortIconLabel: "Sort",

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} rows selected`
      : `${count.toLocaleString()} row selected`,

  // Total rows footer text
  footerTotalRows: "Total Rows:",

  // Total visible rows footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: "Checkbox selection",

  // Boolean cell text
  booleanCellTrueLabel: "true",
  booleanCellFalseLabel: "false",

  // Used core components translation keys
  MuiTablePagination: {
    labelRowsPerPage: "Sorok száma:",
    labelDisplayedRows: ({ from, to, count }) => {
      return `${from}-${to} / ${count !== -1 ? count : `több mint ${to}`}`;
    },
  },
};
