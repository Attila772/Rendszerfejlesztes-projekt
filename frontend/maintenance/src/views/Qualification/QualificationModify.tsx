import { Box, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import { SliceStatus } from "../../components/types";
import { getQualificationById, modifyQualification } from "../../shared/network/qualification.api";
import { QualificationFormValues } from "./QualificationCreate";
import QualificationForm from "./QualificationForm";

const QualificationModify = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<QualificationFormValues>();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState<SliceStatus>("idle");
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const { setHeaderName } = useHeader();

  const qualificationQuery = useQuery(["getQualificationByIdQuery", id], async () => {
    const { data } = await getQualificationById(id ? id : "");
    return data;
  });
  const qualification = qualificationQuery.data;

  const onSubmit = async (values: QualificationFormValues) => {
    try {
      setStatus("pending");
      if (values.name != "") {
        await modifyQualification({
          ...values,
          id: Number.parseInt(id ? id : ""),
        });
      } else {
        throw new Error("NOT_GOOD_NAME");
      }
      navigate(-1);
      enqueueSnackbar(t("qualification.modifySuccess.title"), {
        variant: "success",
      });
      setStatus("success");
    } catch (e: any) {
      if ((e as Error).message === "NOT_GOOD_NAME") {
        enqueueSnackbar(t("qualification.modifyFailure.notGoodName"), {
          variant: "error",
        });
      }
      setStatus("failure");
    }
  };

  useEffect(() => {
    setHeaderName(t("qualification.actions.modifyTitle"));
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
            <QualificationForm form={form} qualification={qualification} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default QualificationModify;
