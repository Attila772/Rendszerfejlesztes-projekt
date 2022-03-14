import {
  Box,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
} from "@material-ui/core";
import { CSSProperties, ReactNode } from "react";

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
  children: ReactNode;
  article?: boolean;
  style?: CSSProperties;
  buttons?: ReactNode;
};

const FormCard = ({ title, children, article, style, buttons }: Props) => {
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

export default FormCard;
