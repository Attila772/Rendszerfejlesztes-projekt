import { Box, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import { SliceStatus } from "../../components/types";
import { createPriviligeLevel } from "../../shared/network/privilige-level.api";
import PriviligeForm from "./PriviligeForm";

export type PriviligeLevelFormValues = {
  name: string;
};

const PriviligeLevelCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<PriviligeLevelFormValues>();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState<SliceStatus>("idle");
  const { setHeaderName } = useHeader();

  const onSubmit = async (values: PriviligeLevelFormValues) => {
    try {
      setStatus("pending");
      await createPriviligeLevel({ ...values });
      navigate(-1);
      enqueueSnackbar(t("priviligeLevel.createSuccess.title"), {
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
    setHeaderName(t("priviligeLevel.actions.createTitle"));
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
            <PriviligeForm form={form} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default PriviligeLevelCreate;
