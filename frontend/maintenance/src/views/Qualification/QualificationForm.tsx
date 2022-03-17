import { Button, Container, Grid, TextField } from "@material-ui/core";
import { Controller, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FormCard from "../../components/FormCard";
import { Qualification } from "../../components/types";
import { QualificationFormValues } from "./QualificationCreate";

type Props = {
  form: UseFormReturn<QualificationFormValues, any>;
  qualification?: Qualification;
};

const QualificationForm = ({ form, qualification }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container maxWidth="xs">
      <FormCard
        title={t("qualification.formLabels.title")}
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
              {qualification ? t("common.button.modify") : t("common.button.create")}
            </Button>
          </>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              control={form.control}
              name="name"
              defaultValue={qualification?.name || ""}
              rules={{ required: t("validation.required").toString() }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t("qualification.formLabels.name")}
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

export default QualificationForm;
