export const getPageName = (hostname: string) => {
  if (hostname.includes("rajosszikviz")) {
    return "RORA";
  } else if (hostname.includes("sch-ps")) {
    return "SCH-ps";
  } else {
    return "RAP";
  }
};
