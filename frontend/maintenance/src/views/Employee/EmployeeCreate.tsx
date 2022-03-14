import { Box, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SliceStatus } from "../../components/types";
import { registerUser } from "../../shared/network/user.api";
import EmployeeForm from "./EmployeeForm";

export type EmployeeFormValues = {
  email: string;
  password1: string;
  password2: string;
  trade: string;
  level: string;
};

const EmployeeCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<EmployeeFormValues>();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState<SliceStatus>("idle");

  const onSubmit = async (values: EmployeeFormValues) => {
    try {
      setStatus("pending");
      if (values.password1 === values.password2) {
        await registerUser({ ...values, password: values.password1 });
      } else {
        throw new Error("NOT_MATCHING_PASSWORDS");
      }
      navigate(-1);
      enqueueSnackbar(t("employee.createSuccess.title"), {
        variant: "success",
      });
      setStatus("success");
    } catch (e: any) {
      if ((e as Error).message === "NOT_MATCHING_PASSWORDS") {
        enqueueSnackbar(t("employee.createFailure.notMatchingPasswords"), {
          variant: "error",
        });
      }
      setStatus("failure");
    }
  };

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
            <EmployeeForm form={form} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default EmployeeCreate;
