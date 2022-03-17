import { Button, Container, Grid, TextField } from "@material-ui/core";
import { Controller, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FormCard from "../../components/FormCard";
import { Category } from "../../components/types";
import { CategoryFormValues } from "./CategoryCreate";

type Props = {
  form: UseFormReturn<CategoryFormValues, any>;
  category?: Category;
};

const CategoryForm = ({ form, category }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container maxWidth="xs">
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
              name="isExceptional"
              defaultValue={category?.isExceptional || undefined}
              rules={{ required: t("validation.required").toString() }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t("category.formLabels.isExceptional")}
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
              defaultValue={category?.normaTimeInHours || undefined}
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
              name="interval.unit"
              defaultValue={category?.interval?.unit || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("category.formLabels.interval")}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={form.control}
              name="parentCategory"
              defaultValue={category?.parentCategory || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("category.formLabels.parentCategory")}
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
                <TextField
                  {...field}
                  label={t("category.formLabels.description")}
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
