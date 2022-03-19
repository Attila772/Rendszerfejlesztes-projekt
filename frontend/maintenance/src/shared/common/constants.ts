import { createTheme } from "@material-ui/core";

export const SERVER_ADDRESS = "http://127.0.0.1:5000";

const DEFAULT_COLORS = {
  main: "#000000",
  mainLight: "#4B0082",
  mainGrey: "#E7EDF1",
  red: "#BA3727",
  green: "#14d9ad",
  white: "#FFFFFF",
  shadowLight: "rgba(0, 0, 0, 0.06)",
  shadowDark: "rgba(0, 0, 0, 0.1)",
  greyWater: "#5C5F58",
  lighterGrey: "#DCE1E3",
  mintGreenLight: "#D4F3EC",
  lightGrey: "#959595",
  lightRed: "#f7e3e1",
  statusBlue: "#049dd9",
  orange: "#FF8C00",
  orangeLight: "#FFD580",
};

const RORA_COLORS = {
  main: "#000000",
  mainLight: "#4B0082",
  mainGrey: "#E7EDF1",
  red: "#BA3727",
  green: "#14d9ad",
  white: "#FFFFFF",
  shadowLight: "rgba(0, 0, 0, 0.06)",
  shadowDark: "rgba(0, 0, 0, 0.1)",
  greyWater: "#5C5F58",
  lighterGrey: "#DCE1E3",
  mintGreenLight: "#D4F3EC",
  lightGrey: "#959595",
  lightRed: "#f7e3e1",
  statusBlue: "#049dd9",
  orange: "#FF8C00",
  orangeLight: "#FFD580",
};

const SCHPS_COLORS = {
  main: "#000000",
  mainLight: "#4B0082",
  mainGrey: "#E5F4FA",
  red: "#BA3727",
  green: "#14d9ad",
  white: "#FFFFFF",
  shadowLight: "rgba(0, 0, 0, 0.06)",
  shadowDark: "rgba(0, 0, 0, 0.1)",
  greyWater: "#5C5F58",
  lighterGrey: "#DCE1E3",
  mintGreenLight: "#D4F3EC",
  lightGrey: "#959595",
  lightRed: "#f7e3e1",
  statusBlue: "#049dd9",
  orange: "#FF8C00",
  orangeLight: "#FFD580",
};

export const COLORS = window.location.hostname.includes("rajosszikviz")
  ? RORA_COLORS
  : window.location.hostname.includes("sch-ps")
  ? SCHPS_COLORS
  : DEFAULT_COLORS;

export const GRADIENT = `linear-gradient(45deg, ${COLORS.main} 0%, ${COLORS.mainLight} 100%)`;
export const GRADIENT_ORANGE = `linear-gradient(45deg, ${COLORS.orange} 0%, ${COLORS.orangeLight} 30%)`;

export const BOX_SHADOW = `${COLORS.shadowLight} 0px 4px 6px -1px, ${COLORS.shadowLight} 0px 2px 4px -1px`;

export const EMAIL_REGEX =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.mainLight,
    },
    secondary: {
      main: COLORS.lightGrey,
    },
    error: {
      main: COLORS.red,
    },
    success: {
      main: COLORS.green,
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
        a: {
          color: COLORS.main,
        },
        svg: {
          color: COLORS.mainLight,
        },
      },
    },
    MuiFormControlLabel: {
      labelPlacementStart: {
        marginLeft: 0,
        marginRight: 0,
      },
    },
    MuiFormControl: {
      marginDense: {
        marginTop: 0,
        marginBottom: 0,
      },
    },
    MuiSvgIcon: {
      root: {
        backgroundColor: COLORS.mainLight,
        color: COLORS.mainLight,
      },
      colorPrimary: {
        backgroundColor: COLORS.mainLight,
        color: COLORS.mainLight,
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 8,
        padding: 0,
        height: "2.5rem",
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 8,
      },
    },
    MuiButton: {
      root: {
        boxShadow: "unset",
        minWidth: "max-content",
        borderRadius: 8,
      },
      label: {
        whiteSpace: "nowrap",
      },
    },
    MuiCard: {
      root: {
        boxShadow: BOX_SHADOW,
        border: `1px solid ${COLORS.mainGrey}`,
      },
    },
  },
  props: {
    MuiTextField: {
      margin: "none",
      fullWidth: true,
      variant: "outlined",
      size: "small",
    },
    MuiButton: {
      variant: "contained",
      color: "primary",
    },
    MuiIconButton: {
      color: "primary",
    },
    MuiSvgIcon: {
      color: "inherit",
    },
  },
});

export default theme;
