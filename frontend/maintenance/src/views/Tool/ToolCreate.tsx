import { Box, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import { Category, Location, SliceStatus } from "../../components/types";
import { createTool } from "../../shared/network/tool.api";
import ToolForm from "./ToolForm";

export type ToolFormValues = {
  name: string;
  category: Category;
  description?: string;
  location?: Location;
};

const ToolCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<ToolFormValues>();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState<SliceStatus>("idle");
  const { setHeaderName } = useHeader();

  const onSubmit = async (values: ToolFormValues) => {
    try {
      setStatus("pending");
      await createTool({ ...values });
      navigate(-1);
      enqueueSnackbar(t("tool.createSuccess.title"), {
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
    setHeaderName(t("tool.actions.createTitle"));
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
            <ToolForm form={form} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default ToolCreate;
