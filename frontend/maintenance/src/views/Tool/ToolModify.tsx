import { Box, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import { SliceStatus } from "../../components/types";
import { getToolById, modifyTool } from "../../shared/network/tool.api";
import { ToolFormValues } from "./ToolCreate";
import ToolForm from "./ToolForm";

const ToolModify = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<ToolFormValues>();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState<SliceStatus>("idle");
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const { setHeaderName } = useHeader();

  const toolQuery = useQuery(["getToolByIdQuery", id], async () => {
    const { data } = await getToolById(id ? parseInt(id) : 0);
    return data;
  });
  const tool = toolQuery.data;

  const onSubmit = async (values: ToolFormValues) => {
    try {
      setStatus("pending");
      await modifyTool({
        ...values,
        id: Number.parseInt(id ? id : ""),
      });
      navigate(-1);
      enqueueSnackbar(t("tool.modifySuccess.title"), {
        variant: "success",
      });
      setStatus("success");
    } catch (e: any) {
      enqueueSnackbar(t("tool.modifyFailure.title"), {
        variant: "error",
      });
      setStatus("failure");
    }
  };

  useEffect(() => {
    setHeaderName(t("tool.actions.modifyTitle"));
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
            <ToolForm form={form} tool={tool} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default ToolModify;
