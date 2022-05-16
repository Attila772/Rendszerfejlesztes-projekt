import { Container, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import { useHeader } from "../../components/Layout/HeaderContext";
import { Tool } from "../../components/types";
import { getToolById } from "../../shared/network/tool.api";

const ToolDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setHeaderName } = useHeader();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  const toolQuery = useQuery(["getToolIdForToolDetails", id], async () => {
    const { data } = await getToolById(id ? parseInt(id) : 0);
    return data;
  });
  
  const tool = {
    id: toolQuery.data?.Data?.id,
    name: toolQuery.data?.Data?.name,
    category: toolQuery.data?.Data?.category,
    description: toolQuery.data?.Data?.descript,
    location: toolQuery.data?.Data?.location
  } as Tool;

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
                value: tool?.name ? tool.name : "-"
              },
              { 
                name: t("common.table.category"),
                value: tool?.category ? tool.category.name : "-"
              },
              { 
                name: t("common.table.location"),
                value: tool?.location ? tool.location.building + "/" + tool.location.room : "-"
              },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <DetailsCard
            title={t("tool.details.toolDescription")}
            singleData= {tool?.description ? tool.description : "-"}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ToolDetails;
