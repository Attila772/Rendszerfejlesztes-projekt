import {
  colors,
  unstable_createMuiStrictModeTheme as createTheme,
} from "@mui/material";

export const AUTH_TOKEN_KEY = "@maintenance_software_auth_token";

export const GRADIENT = `linear-gradient(45deg, ${colors.blue[100]} 0%, ${colors.blueGrey[100]} 100%)`;

const DEFAULT_COLORS = {
  main: "#172C40",
  mainLight: "#14A3D9",
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
};

const RORA_COLORS = {
  main: "#172C40",
  mainLight: "#14A3D9",
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
};

const SCHPS_COLORS = {
  main: "#002a9b",
  mainLight: "#0094D6",
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
};

export const COLORS = window.location.hostname.includes("rajosszikviz")
  ? RORA_COLORS
  : window.location.hostname.includes("sch-ps")
  ? SCHPS_COLORS
  : DEFAULT_COLORS;

export const BOX_SHADOW = `${COLORS.shadowLight} 0px 4px 6px -1px, ${COLORS.shadowLight} 0px 2px 4px -1px`;

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.main,
      light: COLORS.mainLight,
    },
    secondary: {
      main: COLORS.greyWater,
      light: COLORS.lighterGrey,
    },
    background: {
      default: COLORS.white,
    },
    error: {
      main: COLORS.red,
    },
    success: {
      main: COLORS.green,
    },
  },
});

export default theme;
