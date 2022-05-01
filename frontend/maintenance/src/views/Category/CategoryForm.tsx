import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  Switch,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import { valueToPercent } from "@mui/base";
import { Autocomplete } from "@mui/material";
import { Controller, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FormCard from "../../components/FormCard";
import { Category, Qualification } from "../../components/types";
import { COLORS, MAINTENANCE_INTERVALS } from "../../shared/common/constants";
import { CategoryFormValues } from "./CategoryCreate";

type Props = {
  form: UseFormReturn<CategoryFormValues, any>;
  category?: Category;
  categories?: Category[];
  qualifications?: Qualification[];
};

const CategoryForm = ({
  form,
  category,
  categories,
  qualifications,
}: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <FormCard
        title={t("category.formLabels.title")}
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
              {category ? t("common.button.modify") : t("common.button.create")}
            </Button>
          </>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              control={form.control}
              name="qualification"
              defaultValue={category?.qualification || null}
              rules={{ required: t("validation.required").toString() }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  {...field}
                  onChange={(_, value) => field.onChange(value)}
                  getOptionLabel={(option: Qualification) => option.name}
                  isOptionEqualToValue={(option: Qualification, value) =>
                    option.id === value.id
                  }
                  options={qualifications || []}
                  sx={{ width: "100%" }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      style={{ height: 40 }}
                      label={t("category.formLabels.qualification")}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      InputLabelProps={{ required: true }}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={form.control}
              name="name"
              defaultValue={category?.name || ""}
              rules={{ required: t("validation.required").toString() }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t("category.formLabels.name")}
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
              name="normaTimeInHours"
              defaultValue={category?.normaTimeInHours || ""}
              rules={{ required: t("validation.required").toString() }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t("category.formLabels.normaTimeInHours")}
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
              name="intervalInDays"
              defaultValue={category?.intervalInDays || null}
              rules={{
                required: {
                  value: form.getValues("parentCategory") ? false : true,
                  message: t("validation.required"),
                },
              }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  {...field}
                  onChange={(_, value) => field.onChange(value)}
                  getOptionLabel={(option: string) =>
                    MAINTENANCE_INTERVALS
                      ? t(`common.interval.${option}`)
                      : t("common.select.choose")
                  }
                  options={MAINTENANCE_INTERVALS || []}
                  sx={{ width: "100%" }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      style={{ height: 40 }}
                      label={t("category.formLabels.interval")}
                      InputLabelProps={{
                        required: form.getValues("parentCategory")
                          ? false
                          : true,
                      }}
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
              name="parentCategory"
              defaultValue={category?.parentCategory || null}
              render={({ field, fieldState }) => (
                <Autocomplete
                  {...field}
                  onChange={(_, value) => field.onChange(value)}
                  getOptionLabel={(option: Category) => option.name}
                  isOptionEqualToValue={(option: Category, value) =>
                    option.id === value.id
                  }
                  options={categories || []}
                  sx={{ width: "100%" }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      style={{ height: 40 }}
                      label={t("category.formLabels.parentCategory")}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
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
              defaultValue={category?.description || ""}
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
                  placeholder={t("category.formLabels.description")}
                />
              )}
            />
          </Grid>
        </Grid>
      </FormCard>
    </Container>
  );
};

export default CategoryForm;
