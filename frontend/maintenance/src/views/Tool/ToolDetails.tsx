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
            title="asd"
            detailData={[
              { name: "asd", value: "ww" },
              { name: "wwww", value: "qqq" },
              { name: "wwww", value: "qqq" },
              { name: "wwww", value: "qqq" },
              { name: "wwww", value: "qqq" },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <DetailsCard
            title="asd"
            singleData="A TOS olyan kórképek összefoglaló neve, melyek a nyaki szakasz anatómiai rendellenességeinek következtében alakulnak ki. Lényege, hogy a nyak területén található nagyerek, illetve a felső végtag idegfonata nyomás alá kerül, melynek következtében állandó vagy ideiglenes, gyakran nehezen meghatározható tünetek alakulnak ki.

            A TOS (mellkaskimeneti szindrómák, thoracic outlet syndrome) körébe három betegség tartozik: scalenus szindróma, costoclaviculáris szindróma, hyperabdukciós szindróma. A kórképek elnevezése a kiváltó okokra utal, vagyis azokra az anatómiai képletekre illetve testhelyzetre, amelyek az adott betegség tüneteit okozzák.
            
            Hirdetés
            
            A mellkaskimeneti szindrómák diagnózisában és kezelésében leggyakrabban több orvostudományi terület szakemberei vesznek benne részt (neurológus, angiológus, radiológus, reumatológus)."
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ToolDetails;
