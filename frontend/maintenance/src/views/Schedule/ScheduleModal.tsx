import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import { AddBox } from "@mui/icons-material";
import { Autocomplete } from "@mui/material";
import { useSnackbar } from "notistack";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Category, Issue, Schedule, User } from "../../components/types";
import { getCategoryById } from "../../shared/network/category.api";
import { createSchedule } from "../../shared/network/schedule.api";
import { getToolById } from "../../shared/network/tool.api";
import { ScheduleFormValues } from "../Issue/Issues";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  issue: Issue | null;
  users?: any[];
  schedule?: Schedule;
};

const ScheduleModal = ({ open, setOpen, users, schedule, issue }: Props) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit } = useForm<ScheduleFormValues>();

  const categoryQuery = useQuery(
    ["issueItemQueryForScheduleModal", issue],
    async () => {
      if (issue?.item) {
        const data = await getToolById(issue?.item);
        if ((data as any)?.Data?.category) {
          const categoryData = await getCategoryById(
            (data as any)?.Data?.category
          );
          return categoryData;
        }
      }
      return undefined;
    }
  );
  const category = (categoryQuery as any)?.data?.Data as Category;

  const createScheduleSubmit = async (values: ScheduleFormValues) => {
    try {
      console.log(category);
      if (issue && values.user) {
        await createSchedule({
          user: values.user,
          from_date: new Date(),
          length: parseInt(category?.normaTimeInHours?.toString()) ?? 0,
          state: "ASSIGNED",
          task: issue,
        });
        enqueueSnackbar(
          t("notification.add.success", {
            subject: t("schedule.subject"),
          }),
          {
            variant: "success",
          }
        );
        setOpen(false);
      }
    } catch {
      enqueueSnackbar(
        t("notification.add.failure", {
          subject: t("schedule.subject"),
        }),
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>{t("schedule.user.add")}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(createScheduleSubmit)} id="schedule_form">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="user"
                defaultValue={schedule?.user || null}
                rules={{ required: t("validation.required").toString() }}
                render={({ field, fieldState }) => (
                  <Autocomplete
                    {...field}
                    onChange={(_, value) => field.onChange(value)}
                    getOptionLabel={(option: User) => option.email}
                    options={
                      users?.filter((user: User) => {
                        return user.trade === category?.qualification;
                      }) || []
                    }
                    sx={{ width: "100%" }}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        style={{ height: 40 }}
                        label={t("schedule.user.title")}
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
        </form>
        <DialogActions>
          <Box style={{ margin: "20px auto", textAlign: "right" }}>
            <Button onClick={() => setOpen(false)} variant="text">
              {t("common.button.cancel")}
            </Button>
          </Box>
          <Box style={{ margin: "20px auto", textAlign: "center" }}>
            <Button
              type="submit"
              form="schedule_form"
              variant="contained"
              startIcon={<AddBox />}
            >
              {t("common.button.add")}
            </Button>
          </Box>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleModal;
