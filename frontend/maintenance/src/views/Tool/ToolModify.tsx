import { Box, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import { SliceStatus, Tool } from "../../components/types";
import { listCategories } from "../../shared/network/category.api";
import { listLocations } from "../../shared/network/location.api";
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

  const toolQuery = useQuery(
    ["getToolByIdQueryForToolModify", id],
    async () => {
      const data = await getToolById(id ? parseInt(id) : 0);
      return data;
    }
  );

  const tool = {
    name: toolQuery.data?.Data?.name,
    location: toolQuery.data?.Data?.location,
    id: toolQuery.data?.Data?.id,
    description: toolQuery.data?.Data?.descript,
    category: toolQuery.data?.Data?.category,
  } as Tool;

  const locationQuery = useQuery(["locationsForToolFormMod"], async () => {
    const data = await listLocations();
    return data;
  });
  const locations = locationQuery.data?.Data
    ? Object.keys(locationQuery.data?.Data)?.map(
        (key: any) => locationQuery.data?.Data[key]
      )
    : [];
  const categoryQuery = useQuery(["categoriesForToolFormMod"], async () => {
    const data = await listCategories();
    return data;
  });
  const categories = categoryQuery.data?.Data
    ? Object.keys(categoryQuery.data?.Data)?.map(
        (key: any) => categoryQuery.data?.Data[key]
      )
    : [];

  useEffect(() => {
    if (tool) {
      form.setValue(
        "category",
        categories.find((categ) => categ.id === tool.category)
      );
      form.setValue("description", tool.description);
      form.setValue(
        "location",
        locations.find((location) => location.id === tool.location)
      );
      form.setValue("name", tool.name);
    }
  }, [tool]);

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
            <ToolForm
              form={form}
              tool={tool}
              locations={locations}
              categories={categories}
            />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default ToolModify;
