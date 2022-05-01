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
import { listEmployees } from "../../shared/network/user.api";
import IssueForm, { IssueFormValues } from "./IssueForm";

export type CategoryFormValues = {
  name: string;
  isExceptional: boolean;
  normaTimeInHours: number;
  intervalInDays?: string;
  parentCategory?: Category | null;
  description?: string;
};

const IssueCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<IssueFormValues>();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState<SliceStatus>("idle");
  const { setHeaderName } = useHeader();

  const categoryQuery = useQuery(["categoriesForIssueForm"], async () => {
    const data = await listCategories();
    return data;
  });
  const categories = categoryQuery.data?.Data
    ? Object.keys(categoryQuery.data?.Data)?.map(
        (key: any) => categoryQuery.data?.Data[key]
      )
    : [];

  const userQuery = useQuery(["usersForIssueForm"], async () => {
    const data = await listEmployees();
    return data;
  });
  const users = userQuery.data?.Data
    ? Object.keys(userQuery.data?.Data)?.map(
        (key: any) => userQuery.data?.Data[key]
      )
    : [];

  const onSubmit = async (values: IssueFormValues) => {
    try {
      setStatus("pending");
      await createIssue({
        ...values,
        priority: parseInt(values.priority.toString()),
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
            <IssueForm form={form} categories={categories} users={users} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default IssueCreate;
