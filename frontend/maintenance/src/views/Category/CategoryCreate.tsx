import { Box, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import { Category, SliceStatus } from "../../components/types";
import {
  createCategory,
  listCategories,
} from "../../shared/network/category.api";
import CategoryForm from "./CategoryForm";

export type CategoryFormValues = {
  name: string;
  isExceptional: boolean;
  normaTimeInHours: number;
  intervalInDays?: string;
  parentCategory?: Category | null;
  description?: string;
};

const CategoryCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<CategoryFormValues>();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState<SliceStatus>("idle");
  const { setHeaderName } = useHeader();

  const categoryQuery = useQuery(["categoriesForToolForm"], async () => {
    const { data } = await listCategories();
    return data;
  });
  const categories = categoryQuery.data?.Data
    ? Object.keys(categoryQuery.data?.Data)?.map(
        (key: any) => categoryQuery.data?.Data[key]
      )
    : [];

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      setStatus("pending");
      await createCategory({
        ...values,
        isExceptional: values.isExceptional || false,
      });
      navigate(-1);
      enqueueSnackbar(t("category.createSuccess.title"), {
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
    setHeaderName(t("category.actions.createTitle"));
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
            <CategoryForm form={form} categories={categories} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default CategoryCreate;
