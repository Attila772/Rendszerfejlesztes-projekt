import { Box, Button, Container, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import { Controller, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FormCard from "../../components/FormCard";
import { Category, Issue, Log, User } from "../../components/types";

export type IssueFormValues = {
  name: string;
  category: Category;
  assignedUser: User;
  priority: number | string;
};

type Props = {
  form: UseFormReturn<IssueFormValues, any>;
  issue?: Issue;
  categories?: Category[];
  users?: User[];
  logs?: Log[];
};

const IssueForm = ({ form, issue, categories, users, logs }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <FormCard
        title={
          <Box display="flex" justifyContent="space-between">
            <Box>{t("issue.formLabels.title")}</Box>
          </Box>
        }
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
              {issue ? t("common.button.modify") : t("common.button.create")}
            </Button>
          </>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              control={form.control}
              name="name"
              defaultValue={issue?.name || ""}
              rules={{ required: t("validation.required").toString() }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t("issue.formLabels.name")}
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
              name="category"
              defaultValue={issue?.category}
              rules={{ required: t("validation.required").toString() }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  {...field}
                  onChange={(_, value) => field.onChange(value)}
                  getOptionLabel={(option: Category) => option.name}
                  options={categories || []}
                  sx={{ width: "100%" }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      style={{ height: 40 }}
                      label={t("issue.formLabels.category")}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={form.control}
              name="assignedUser"
              defaultValue={issue?.assignedUser}
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
                      label={t("issue.formLabels.assignedUser")}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={form.control}
              name="priority"
              defaultValue={issue?.priority || ""}
              render={({ field, fieldState }) => (
                <TextField {...field} label={t("issue.formLabels.priority")} />
              )}
            />
          </Grid>
        </Grid>
      </FormCard>
    </Container>
  );
};

export default IssueForm;
