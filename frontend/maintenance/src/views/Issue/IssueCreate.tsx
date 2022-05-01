import { Box, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import { Category, SliceStatus } from "../../components/types";
import { listCategories } from "../../shared/network/category.api";
import { createIssue } from "../../shared/network/issue.api";
import { listTools } from "../../shared/network/tool.api";
import { listEmployees } from "../../shared/network/user.api";
import IssueForm, { IssueFormValues } from "./IssueForm";

const IssueCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<IssueFormValues>();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState<SliceStatus>("idle");
  const { setHeaderName } = useHeader();

  const toolQuery = useQuery(["toolsForIssueCreate"], async () => {
    const data = await listTools();
    return data;
  });
  const tools = toolQuery.data?.Data
    ? Object.keys(toolQuery.data?.Data)?.map(
        (key: any) => toolQuery.data?.Data[key]
      )
    : [];

  const onSubmit = async (values: IssueFormValues) => {
    try {
      setStatus("pending");
      await createIssue({
        ...values,
        priority: 1,
        item: parseInt(values.item.id.toString()),
      });
      navigate(-1);
      enqueueSnackbar(t("issue.createSuccess.title"), {
        variant: "success",
      });
      setStatus("success");
    } catch (e: any) {
      enqueueSnackbar(t("issue.createFailure.title"), {
        variant: "error",
      });
      setStatus("failure");
    }
  };

  useEffect(() => {
    setHeaderName(t("issue.actions.createTitle"));
    return () => {
      setHeaderName(null);
    };
  }, []);

  return (
    <Container maxWidth="sm">
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
            <IssueForm form={form} tools={tools} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default IssueCreate;
