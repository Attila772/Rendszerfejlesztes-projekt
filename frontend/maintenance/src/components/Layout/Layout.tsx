import { Box, colors, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import SideBar from "./SideBar/SideBar";

type Props = {
  children: React.ReactNode;
  removeToken?: any;
};

const useStyles = makeStyles(
  {
    root: {
      display: "flex",
      position: "relative",
    },
    pageWrapper: {
      flex: 1,
      display: "flex",
      backgroundColor: colors.common.white,
      height: "100vh",
    },
    content: {
      flexGrow: 1,
      overflow: "auto",
      marginLeft: 200,
      width: "calc(100% - 200px)",
    },
  },
  {
    name: "Layout",
  }
);

const Layout = ({ children, removeToken }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(80);

  return (
    <Box className={classes.pageWrapper}>
      <SideBar
        open={open}
        setOpen={setOpen}
        width={width}
        setWidth={setWidth}
        removeToken={removeToken}
      />
      <Box
        className={classes.content}
        style={{
          marginLeft: 220,
          width: `calc(100% - 200px)`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
