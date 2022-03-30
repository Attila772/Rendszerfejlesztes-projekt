import { Box, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import { SliceStatus, User } from "../../components/types";
import { createLog } from "../../shared/network/log.api";
import LogForm from "./LogForm";

export type LogFormValues = {
  status: string;
  dateTime: string;
  user?: User;
};

const LogCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<LogFormValues>();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState<SliceStatus>("idle");
  const { setHeaderName } = useHeader();

  const onSubmit = async (values: LogFormValues) => {
    try {
      setStatus("pending");
      await createLog({ ...values });
      navigate(-1);
      enqueueSnackbar(t("log.createSuccess.title"), {
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

  useEffect(() => {
    setHeaderName(t("log.actions.createTitle"));
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
            <LogForm form={form} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default LogCreate;
