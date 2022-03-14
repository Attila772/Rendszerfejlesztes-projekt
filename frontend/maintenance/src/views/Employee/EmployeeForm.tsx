import { Button, Container, Grid, TextField } from "@material-ui/core";
import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FormCard from "../../components/FormCard";
import { User } from "../../components/types";
import { EMAIL_REGEX } from "../../shared/common/constants";
import { EmployeeFormValues } from "./EmployeeCreate";

type Props = {
  form: UseFormReturn<EmployeeFormValues, any>;
  employee?: User;
};

const EmployeeForm = ({ form, employee }: Props) => {
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
          <Grid item xs={12}>
            <Controller
              control={form.control}
              name="email"
              defaultValue={employee?.email || ""}
              rules={{
                required: t("validation.required").toString(),
                pattern: {
                  value: EMAIL_REGEX,
                  message: t("validation.email"),
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  style={{ width: "100%" }}
                  label={t("employee.formLabels.email")}
                  InputLabelProps={{ required: true }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={form.control}
              name="password1"
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
          <Grid item xs={6}>
            <Controller
              control={form.control}
              name="password2"
              defaultValue={employee?.password || ""}
              rules={{ required: t("validation.required").toString() }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t("employee.formLabels.password2")}
                  InputLabelProps={{ required: true }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={form.control}
              name="trade"
              defaultValue={employee?.trade || ""}
              rules={{ required: t("validation.required").toString() }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t("employee.formLabels.trade")}
                  InputLabelProps={{ required: true }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={form.control}
              name="level"
              defaultValue={employee?.level || ""}
              rules={{ required: t("validation.required").toString() }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t("employee.formLabels.level")}
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

export default EmployeeForm;
