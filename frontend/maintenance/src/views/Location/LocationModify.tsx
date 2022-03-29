import { Box, CircularProgress, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useHeader } from "../../components/Layout/HeaderContext";
import { SliceStatus } from "../../components/types";
import { getLocationById, modifyLocation } from "../../shared/network/location.api";
import { LocationFormValues } from "./LocationCreate";
import LocationForm from "./LocationForm";

const LocationModify = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<LocationFormValues>();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState<SliceStatus>("idle");
  const uselocation = useLocation();
  const query = new URLSearchParams(uselocation.search);
  const id = query.get("id");
  const { setHeaderName } = useHeader();

  const locationQuery = useQuery(["getLocationByIdQuery", id], async () => {
    const { data } = await getLocationById(id ? id : "");
    return data;
  });
  const location = locationQuery.data;

  const onSubmit = async (values: LocationFormValues) => {
    try {
      setStatus("pending");
      if (values.building != "") {
        await modifyLocation({
          ...values,
          id: Number.parseInt(id ? id : ""),
        });
      } else {
        throw new Error("NOT_GOOD_BUILDING");
      }
      navigate(-1);
      enqueueSnackbar(t("location.modifySuccess.title"), {
        variant: "success",
      });
      setStatus("success");
    } catch (e: any) {
      if ((e as Error).message === "NOT_GOOD_BUILDING") {
        enqueueSnackbar(t("location.modifyFailure.notGoodBuilding"), {
          variant: "error",
        });
      }
      setStatus("failure");
    }
  };

  useEffect(() => {
    setHeaderName(t("location.actions.modifyTitle"));
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
            <LocationForm form={form} location={location} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default LocationModify;
