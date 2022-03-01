import { CircularProgress, Grid, Typography } from "@mui/material";
import { getPageName } from "../Util/getPageName";

export default function PageLoading() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        direction="column"
        style={{ height: 130 }}
      >
        <Typography variant="h3" color="primary">
          {getPageName(window.location.hostname)}
        </Typography>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}
