import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { CSSProperties, ReactNode } from "react";
import { COLORS } from "../../shared/common/constants";

const useStyles = makeStyles({
  card: {
    width: "100%",
  },

  content: {
    "&.MuiCardContent-root": {
      paddingBottom: 16,
    },
    padding: 16,
  },
});

type Props = {
  title: ReactNode;
  children?: ReactNode;
  detailData?: { name: string; value: string }[];
  singleData?: string;
  article?: boolean;
  style?: CSSProperties;
  buttons?: ReactNode;
};

const DetailsCard = ({
  title,
  children,
  article,
  style,
  buttons,
  detailData,
  singleData,
}: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} style={style}>
      <CardHeader
        title={title}
        titleTypographyProps={{
          variant: "h5",
        }}
      />
      <CardContent
        className={classes.content}
        style={{ overflow: article ? "auto" : "unset", height: "100%" }}
      >
        {!!detailData?.length && (
          <Grid container>
            {detailData?.map((data, index) => (
              <>
                <Grid
                  item
                  xs={6}
                  sm={3}
                  style={{
                    color: COLORS.mainLight,
                    fontWeight: 650,
                    borderWidth: 0,
                    paddingLeft: 8,
                    borderLeft: index % 2 === 1 ? 2 : 0,
                    borderStyle: "solid",
                  }}
                >
                  {`${data.name}:`}
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography noWrap>{data.value}</Typography>
                </Grid>
              </>
            ))}
          </Grid>
        )}
        {!detailData?.length && singleData && (
          <Grid container>
            <Grid item xs={12}>
              {singleData}
            </Grid>
          </Grid>
        )}
        {children}
        {buttons && (
          <Box
            display={"flex"}
            justifyContent="flex-end"
            width="100%"
            style={{ marginTop: 20 }}
          >
            {buttons}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
