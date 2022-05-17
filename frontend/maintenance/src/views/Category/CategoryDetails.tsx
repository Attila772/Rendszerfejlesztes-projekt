import { Container, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import { useHeader } from "../../components/Layout/HeaderContext";
import { Category, Qualification } from "../../components/types";
import { getCategoryById } from "../../shared/network/category.api";
import { getQualificationById } from "../../shared/network/qualification.api";

const CategoryDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setHeaderName } = useHeader();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  const categoryQuery = useQuery(
    ["getCategoryIdForToolDetails", id],
    async () => {
      const data = await getCategoryById(id ? parseInt(id) : 0);
      return data;
    }
  );

  const category = {
    id: categoryQuery.data?.Data?.id,
    name: categoryQuery.data?.Data?.name,
    normaTimeInHours: categoryQuery.data?.Data?.normal_time,
    intervalInDays: categoryQuery.data?.Data?.interval,
    description: categoryQuery.data?.Data?.descript,
    parentCategory: categoryQuery.data?.Data?.parent_id,
    qualification: categoryQuery.data?.Data?.qualification,
  } as Category;

  useEffect(() => {
    setHeaderName(t("category.actions.detailsTitle"));
    return () => {
      setHeaderName(null);
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DetailsCard
            title={t("category.details.title")}
            detailData={[
              {
                name: t("common.table.user"),
                value: category?.name ? category.name : "-",
              },
              {
                name: t("common.table.normaTimeInHours"),
                value: category?.normaTimeInHours
                  ? category?.normaTimeInHours.toString()
                  : "-",
              },
              {
                name: t("common.table.interval"),
                value: category?.intervalInDays
                  ? category?.intervalInDays.toString()
                  : "-",
              },
              {
                name: t("common.table.parentCategory"),
                value:
                  category?.parentCategory !== -1
                    ? category?.parentCategory
                    : "-",
              },
              {
                name: t("category.details.qualification"),
                value: category?.qualification ? category?.qualification : "-",
              },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <DetailsCard
            title={t("category.details.categoryDescription")}
            singleData={category?.description ? category.description : "-"}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CategoryDetails;
