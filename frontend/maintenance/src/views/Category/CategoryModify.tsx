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
  modifyCategory,
} from "../../shared/network/category.api";
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
    const { data } = await getCategoryById(id ? id : "");
    return data;
  });
  const category = categoryQuery.data;

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
            <CategoryForm form={form} category={category} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default CategoryModify;
