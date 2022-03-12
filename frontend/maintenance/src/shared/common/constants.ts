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
