import { Container, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import { useHeader } from "../../components/Layout/HeaderContext";
import { Category, Location, Tool } from "../../components/types";
import { getCategoryById } from "../../shared/network/category.api";
import { getLocationById } from "../../shared/network/location.api";
import { getToolById } from "../../shared/network/tool.api";

const ToolDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setHeaderName } = useHeader();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  const toolQuery = useQuery(["getToolIdForToolDetails", id], async () => {
    const data = await getToolById(id ? parseInt(id) : 0);
    return data;
  });

  const tool = {
    id: toolQuery.data?.Data?.id,
    name: toolQuery.data?.Data?.name,
    category: toolQuery.data?.Data?.category,
    description: toolQuery.data?.Data?.descript,
    location: toolQuery.data?.Data?.location,
  } as Tool;

  const locationQuery = useQuery(["locationForToolDetails", tool], async () => {
    const data = await getLocationById(
      tool?.location ? (tool?.location as any) : ""
    );
    return data;
  });
  const locationTool = locationQuery.data?.Data as Location;

  const categoryQuery = useQuery(["categoryForToolDetails", tool], async () => {
    const data = await getCategoryById(
      parseInt(tool?.category ? (tool?.category as any)?.toString() : "-1")
    );
    return data;
  });
  const category = categoryQuery?.data?.Data as Category;

  useEffect(() => {
    setHeaderName(t("tool.actions.detailsTitle"));
    return () => {
      setHeaderName(null);
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DetailsCard
            title={t("tool.details.title")}
            detailData={[
              {
                name: t("common.table.user"),
                value: tool?.name ? tool.name : "-",
              },
              {
                name: t("common.table.category"),
                value: category?.name ? category?.name : "-",
              },
              {
                name: t("common.table.location"),
                value: locationTool?.building
                  ? `${locationTool?.building}${
                      locationTool?.room ? ` / ${locationTool?.room}` : ""
                    }`
                  : "-",
              },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <DetailsCard
            title={t("tool.details.toolDescription")}
            singleData={tool?.description ? tool.description : "-"}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ToolDetails;
