import * as React from "react";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Layout from "./Layout/Layout";

const LayoutLoading = () => {
  return (
    <Layout>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 64px)"
      >
        <CircularProgress size={48} color="primary" />
      </Box>
    </Layout>
  );
};

export default LayoutLoading;
