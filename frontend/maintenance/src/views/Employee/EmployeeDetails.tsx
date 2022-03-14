import { Box, CircularProgress, Container } from "@material-ui/core";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import { getEmployeeById } from "../../shared/network/user.api";

const EmployeeDetails = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const { setHeaderName } = useHeader();

  const employeeQuery = useQuery(["getEmployeeByIdQuery", id], async () => {
    const { data } = await getEmployeeById(id ? id : "");
    return data;
  });
  const employee = employeeQuery.data;

  useEffect(() => {
    setHeaderName(t("employee.actions.detailsTitle"));
    return () => {
      setHeaderName(null);
    };
  }, []);

  return (
    <Container maxWidth="xs">
      {employeeQuery.isFetching ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="300px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default EmployeeDetails;
