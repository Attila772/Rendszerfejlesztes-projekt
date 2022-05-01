import { Box, Button, Container, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import { Controller, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FormCard from "../../components/FormCard";
import { Category, Issue, Log, Tool, User } from "../../components/types";

export type IssueFormValues = {
  name: string;
  priority: number | string;
  item: Tool;
};

type Props = {
  form: UseFormReturn<IssueFormValues, any>;
  issue?: Issue;
  tools?: Tool[];
  logs?: Log[];
};

const IssueForm = ({ form, issue, tools, logs }: Props) => {
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
              name="item"
              defaultValue={tools?.find((tool) => tool.id === issue?.item)}
              rules={{ required: t("validation.required").toString() }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  {...field}
                  onChange={(_, value) => field.onChange(value)}
                  getOptionLabel={(option: Tool) => option.name}
                  options={tools || []}
                  sx={{ width: "100%" }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      style={{ height: 40 }}
                      label={t("issue.formLabels.tool")}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
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

export default IssueForm;
