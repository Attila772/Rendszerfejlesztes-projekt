import { Box, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import { Qualification, SliceStatus } from "../../components/types";
import { listQualifications } from "../../shared/network/qualification.api";
import { registerUser } from "../../shared/network/user.api";
import EmployeeForm from "./EmployeeForm";

export type EmployeeFormValues = {
  email: string;
  password1: string;
  password2: string;
  trade: Qualification | null;
  level: string | null;
};

const EmployeeCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<EmployeeFormValues>();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState<SliceStatus>("idle");
  const { setHeaderName } = useHeader();

  const qualificationQuery = useQuery(
    ["qualificationsForEmployeeForm"],
    async () => {
      const data = await listQualifications();
      return data;
    }
  );
  const qualifications = qualificationQuery.data?.Data
    ? Object.keys(qualificationQuery.data?.Data)?.map(
        (key: any) => qualificationQuery.data?.Data[key]
      )
    : [];

  const onSubmit = async (values: EmployeeFormValues) => {
    try {
      setStatus("pending");
      if (values.password1 === values.password2) {
        if (values.level && values.trade) {
          await registerUser({
            ...values,
            password: values.password1,
            level: values.level,
            trade: values.trade,
          });
          navigate(-1);
          enqueueSnackbar(t("employee.createSuccess.title"), {
            variant: "success",
          });
          setStatus("success");
        }
      } else {
        throw new Error("NOT_MATCHING_PASSWORDS");
      }
    } catch (e: any) {
      if ((e as Error).message === "NOT_MATCHING_PASSWORDS") {
        enqueueSnackbar(t("employee.createFailure.notMatchingPasswords"), {
          variant: "error",
        });
      }
      setStatus("failure");
    }
  };

  useEffect(() => {
    setHeaderName(t("employee.actions.createTitle"));
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
            <EmployeeForm form={form} qualifications={qualifications} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default EmployeeCreate;
