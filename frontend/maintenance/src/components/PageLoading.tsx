import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

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
          {"Loading"}
        </Typography>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}
