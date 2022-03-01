import * as React from "react";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
import { RootState } from "../../config/store";
import PageLoading from "../PageLoading";
import Layout from "./Layout";

const LayoutLoading = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.authentication.isAuthenticated
  );

  if (!isAuthenticated) {
    return <PageLoading />;
  }

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
