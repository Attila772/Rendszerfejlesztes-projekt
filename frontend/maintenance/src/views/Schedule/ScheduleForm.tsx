import { Button, Container, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import { Controller, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FormCard from "../../components/FormCard";
import {
  Category,
  Location,
  Schedule,
  Tool,
  User,
} from "../../components/types";
import { ScheduleFormValues } from "../Issue/Issues";

type Props = {
  form: UseFormReturn<ScheduleFormValues, any>;
  users?: any[];
  schedule?: Schedule;
};

const ScheduleForm = ({ form, users, schedule }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container maxWidth="xs">
      <FormCard
        title={t("tool.formLabels.title")}
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
              {schedule ? t("common.button.modify") : t("common.button.create")}
            </Button>
          </>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              control={form.control}
              name="user"
              defaultValue={schedule?.user || null}
              rules={{ required: t("validation.required").toString() }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  {...field}
                  onChange={(_, value) => field.onChange(value)}
                  getOptionLabel={(option: User) => option.email}
                  options={users || []}
                  sx={{ width: "100%" }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      style={{ height: 40 }}
                      label={t("tool.formLabels.category")}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      InputLabelProps={{ required: true }}
                    />
                  )}
                />
              )}
            />
          </Grid>
        </Grid>
      </FormCard>
    </Container>
  );
};

export default ScheduleForm;
