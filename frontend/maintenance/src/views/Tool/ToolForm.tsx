import { Button, Container, Grid, TextField } from "@material-ui/core";
import { Autocomplete, TextareaAutosize } from "@mui/material";
import { Controller, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FormCard from "../../components/FormCard";
import { Category, Location, Tool } from "../../components/types";
import { ToolFormValues } from "./ToolCreate";

type Props = {
  form: UseFormReturn<ToolFormValues, any>;
  locations?: any[];
  categories?: any[];
  tool?: Tool;
};

const ToolForm = ({ form, tool, locations, categories }: Props) => {
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
              {tool ? t("common.button.modify") : t("common.button.create")}
            </Button>
          </>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              control={form.control}
              name="name"
              defaultValue={tool?.name || ""}
              rules={{ required: t("validation.required").toString() }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t("tool.formLabels.name")}
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
              name="category"
              defaultValue={
                categories?.find((categ) => categ.id === tool?.category) || null
              }
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
          <Grid item xs={12}>
            <Controller
              control={form.control}
              name="location"
              rules={{ required: t("validation.required").toString() }}
              defaultValue={
                locations?.find((location) => location.id === tool?.location) ||
                null
              }
              render={({ field, fieldState }) => (
                <Autocomplete
                  {...field}
                  onChange={(_, value) => field.onChange(value)}
                  getOptionLabel={(option: Location) =>
                    option.building + " / " + option.room
                  }
                  options={locations || []}
                  sx={{ width: "100%" }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label={t("tool.formLabels.location.title")}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      InputLabelProps={{ required: true }}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={form.control}
              name="description"
              defaultValue={tool?.description || ""}
              render={({ field }) => (
                <TextareaAutosize
                  style={{
                    width: "calc(100% - 20px)",
                    maxWidth: "calc(100% - 20px)",
                    minWidth: "calc(100% - 20px)",
                    borderRadius: 8,
                    minHeight: 50,
                    padding: 8,
                  }}
                  {...field}
                  minRows={3}
                  maxRows={50}
                  placeholder={t("tool.formLabels.description")}
                />
              )}
            />
          </Grid>
        </Grid>
      </FormCard>
    </Container>
  );
};

export default ToolForm;
