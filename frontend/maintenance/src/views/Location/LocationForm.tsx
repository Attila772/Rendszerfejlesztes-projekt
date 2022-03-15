import { Button, Container, Grid, TextField } from "@material-ui/core";
import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FormCard from "../../components/FormCard";
import { Location, User } from "../../components/types";
import { EMAIL_REGEX } from "../../shared/common/constants";
import { LocationFormValues } from "./LocationCreate";

type Props = {
  form: UseFormReturn<LocationFormValues, any>;
  location?: Location;
};

const LocationForm = ({ form, location }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container maxWidth="xs">
      <FormCard
        title={t("location.formLabels.title")}
        buttons={
          <>
            <Button
              variant="text"
              onClick={() => navigate(-1)}
              style={{ marginRight: 8 }}
            >
              {t("common.button.cancel")}
            </Button>
            <Button variant="contained" type="submit">
              {location ? t("common.button.modify") : t("common.button.create")}
            </Button>
          </>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              control={form.control}
              name="building"
              defaultValue={location?.building || ""}
              rules={{
                required: t("validation.required").toString(),
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  style={{ width: "100%" }}
                  label={t("location.formLabels.building")}
                  InputLabelProps={{ required: true }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={form.control}
              name="room"
              defaultValue={location?.room || ""}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t("location.formLabels.room")}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </FormCard>
    </Container>
  );
};

export default LocationForm;
