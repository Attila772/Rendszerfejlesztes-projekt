import { Box, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import { SliceStatus } from "../../components/types";
import { getIssueById, modifyIssue } from "../../shared/network/issue.api";
import { modifyTool } from "../../shared/network/tool.api";
import IssueForm, { IssueFormValues } from "./IssueForm";

const IssueModify = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<IssueFormValues>();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState<SliceStatus>("idle");
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const { setHeaderName } = useHeader();

  const issueQuery = useQuery(["getIssueByIdQuery", id], async () => {
    const { data } = await getIssueById(id ? id : "");
    return data;
  });
  const issue = issueQuery.data;

  const onSubmit = async (values: IssueFormValues) => {
    try {
      setStatus("pending");
      await modifyIssue({
        ...values,
        priority: 1,
        item: parseInt(values.item.id.toString()),
        id: Number.parseInt(id ? id : ""),
      });
      navigate(-1);
      enqueueSnackbar(t("issue.modifySuccess.title"), {
        variant: "success",
      });
      setStatus("success");
    } catch (e: any) {
      enqueueSnackbar(t("issue.modifyFailure.title"), {
        variant: "error",
      });
      setStatus("failure");
    }
  };

  useEffect(() => {
    setHeaderName(t("issue.actions.modifyTitle"));
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
            <IssueForm form={form} issue={issue} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default IssueModify;
