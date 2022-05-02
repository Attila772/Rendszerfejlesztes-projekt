import { Box, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import { SliceStatus } from "../../components/types";
import {
  getCategoryById,
  listCategories,
  modifyCategory,
} from "../../shared/network/category.api";
import { listQualifications } from "../../shared/network/qualification.api";
import { CategoryFormValues } from "./CategoryCreate";
import CategoryForm from "./CategoryForm";

const CategoryModify = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<CategoryFormValues>();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState<SliceStatus>("idle");
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const { setHeaderName } = useHeader();

  const categoryQuery = useQuery(["getCategoryByIdQuery", id], async () => {
    const { data } = await getCategoryById(id ? parseInt(id) : 0);
    return data;
  });
  const category = categoryQuery.data;

  const categoryQueryList = useQuery(["categoriesForToolForm"], async () => {
    const { data } = await listCategories();
    return data;
  });
  const categories = categoryQueryList.data?.Data
    ? Object.keys(categoryQueryList.data?.Data)?.map(
        (key: any) => categoryQueryList.data?.Data[key]
      )
    : [];

  const qualificationQuery = useQuery(
    ["qualificationsForToolForm"],
    async () => {
      const { data } = await listQualifications();
      return data;
    }
  );
  const qualifications = qualificationQuery.data?.Data
    ? Object.keys(qualificationQuery.data?.Data)?.map(
        (key: any) => qualificationQuery.data?.Data[key]
      )
    : [];

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      setStatus("pending");
      await modifyCategory({
        ...values,
        id: Number.parseInt(id ? id : ""),
      });
      navigate(-1);
      enqueueSnackbar(t("category.modifySuccess.title"), {
        variant: "success",
      });
      setStatus("success");
    } catch (e: any) {
      enqueueSnackbar(t("category.modifyFailure.title"), {
        variant: "error",
      });
      setStatus("failure");
    }
  };

  useEffect(() => {
    setHeaderName(t("category.actions.modifyTitle"));
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
            <CategoryForm
              form={form}
              category={category}
              qualifications={qualifications}
              categories={categories}
            />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default CategoryModify;
