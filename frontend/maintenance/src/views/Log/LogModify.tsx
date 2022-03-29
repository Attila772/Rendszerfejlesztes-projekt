import { Box, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import { SliceStatus } from "../../components/types";
import { getLogById, modifyLog } from "../../shared/network/log.api";
import { LogFormValues } from "./LogCreate";
import LogForm from "./LogForm";

const LogModify = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<LogFormValues>();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState<SliceStatus>("idle");
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const { setHeaderName } = useHeader();

  const logQuery = useQuery(["getLogByIdQuery", id], async () => {
    const { data } = await getLogById(id ? id : "");
    return data;
  });
  const log = logQuery.data;

  const onSubmit = async (values: LogFormValues) => {
    try {
      setStatus("pending");
      if (values.status != "") {
        await modifyLog({
          ...values,
          id: Number.parseInt(id ? id : ""),
        });
      } else {
        throw new Error("NOT_GOOD_STATUS");
      }
      navigate(-1);
      enqueueSnackbar(t("log.modifySuccess.title"), {
        variant: "success",
      });
      setStatus("success");
    } catch (e: any) {
      if ((e as Error).message === "NOT_GOOD_STATUS") {
        enqueueSnackbar(t("log.modifyFailure.notGoodStatus"), {
          variant: "error",
        });
      }
      setStatus("failure");
    }
  };

  useEffect(() => {
    setHeaderName(t("log.actions.modifyTitle"));
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
            <LogForm form={form} log={log} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default LogModify;
