import { Box, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import { SliceStatus } from "../../components/types";
import { getEmployeeById, modifyEmployee } from "../../shared/network/user.api";
import { EmployeeFormValues } from "./EmployeeCreate";
import EmployeeForm from "./EmployeeForm";

const EmployeeModify = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<EmployeeFormValues>();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState<SliceStatus>("idle");
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const { setHeaderName } = useHeader();

  const employeeQuery = useQuery(["getEmployeeByIdQuery", id], async () => {
    const { data } = await getEmployeeById(id ? id : "");
    return data;
  });
  const employee = employeeQuery.data;

  const onSubmit = async (values: EmployeeFormValues) => {
    try {
      setStatus("pending");
      if (values.password1 === values.password2) {
        await modifyEmployee({
          ...values,
          password: values.password1,
          id: Number.parseInt(id ? id : ""),
        });
      } else {
        throw new Error("NOT_MATCHING_PASSWORDS");
      }
      navigate(-1);
      enqueueSnackbar(t("employee.modifySuccess.title"), {
        variant: "success",
      });
      setStatus("success");
    } catch (e: any) {
      if ((e as Error).message === "NOT_MATCHING_PASSWORDS") {
        enqueueSnackbar(t("employee.modifyFailure.notMatchingPasswords"), {
          variant: "error",
        });
      }
      setStatus("failure");
    }
  };

  useEffect(() => {
    setHeaderName(t("employee.actions.modifyTitle"));
    return () => {
      setHeaderName(null);
    };
  }, []);

  return (
    <Container maxWidth="xs">
      {status === "pending" ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="300px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <EmployeeForm form={form} employee={employee} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default EmployeeModify;
