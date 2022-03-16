import { Button, Container, Grid, TextField } from "@material-ui/core";
import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FormCard from "../../components/FormCard";
import { User } from "../../components/types";
import { EMAIL_REGEX } from "../../shared/common/constants";
import { PriviligeLevelFormValues } from "./PriviligeLevelCreate";

type Props = {
  form: UseFormReturn<PriviligeLevelFormValues, any>;
  employee?: User;
};

const PriviligeForm = ({ form, employee }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container maxWidth="xs">
      <FormCard
        title={t("employee.formLabels.title")}
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
              {employee ? t("common.button.modify") : t("common.button.create")}
            </Button>
          </>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              control={form.control}
              name="level"
              defaultValue={employee?.password || ""}
              rules={{ required: t("validation.required").toString() }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t("employee.formLabels.password1")}
                  InputLabelProps={{ required: true }}
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

export default PriviligeForm;
