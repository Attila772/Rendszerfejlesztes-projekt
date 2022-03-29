import { Box, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import { SliceStatus } from "../../components/types";
import { getPriviligeLevelById, modifyPriviligeLevel } from "../../shared/network/privilige-level.api";
import { PriviligeLevelFormValues } from "./PriviligeLevelCreate";
import PriviligeForm from "./PriviligeForm";

const PriviligeLevelModify = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<PriviligeLevelFormValues>();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState<SliceStatus>("idle");
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const { setHeaderName } = useHeader();

  const priviligeLevelQuery = useQuery(["getPriviligeLevelByIdQuery", id], async () => {
    const { data } = await getPriviligeLevelById(id ? id : "");
    return data;
  });
  const priviligeLevel = priviligeLevelQuery.data;

  const onSubmit = async (values: PriviligeLevelFormValues) => {
    try {
      setStatus("pending");
      if (values.name != "") {
        await modifyPriviligeLevel({
          ...values,
          id: Number.parseInt(id ? id : ""),
        });
      } else {
        throw new Error("NOT_GOOD_NAME");
      }
      navigate(-1);
      enqueueSnackbar(t("priviligeLevel.modifySuccess.title"), {
        variant: "success",
      });
      setStatus("success");
    } catch (e: any) {
      if ((e as Error).message === "NOT_GOOD_NAME") {
        enqueueSnackbar(t("priviligeLevel.modifyFailure.notGoodName"), {
          variant: "error",
        });
      }
      setStatus("failure");
    }
  };

  useEffect(() => {
    setHeaderName(t("priviligeLevel.actions.modifyTitle"));
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
            <PriviligeForm form={form} priviligeLevel={priviligeLevel} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default PriviligeLevelModify;
