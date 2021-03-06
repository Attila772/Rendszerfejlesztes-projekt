import {
  Box,
  colors,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { ArrowBackIosOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useHeader } from "./HeaderContext";
import SideBar from "./SideBar/SideBar";

type Props = {
  children: React.ReactNode;
  removeToken?: any;
  token?: any;
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
      marginLeft: 220,
      width: "calc(100% - 220px)",
    },
  },
  {
    name: "Layout",
  }
);

const Layout = ({ children, removeToken, token }: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(80);
  const { headerButtons, headerName } = useHeader();
  const page = window.location.pathname.match(/^\/([^/]*)[^/]?/)?.[1] || "home";
  const title = t([`drawer.${page}`, "drawer.notFound"]);

  return (
    <Box className={classes.pageWrapper}>
      <SideBar
        open={open}
        setOpen={setOpen}
        width={width}
        setWidth={setWidth}
        removeToken={removeToken}
        token={token}
      />

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        width="100%"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          padding={"24px 24px 24px calc(220px + 24px)"}
        >
          <Box display="flex" alignItems="center" gridGap={14}>
            {window.location.pathname !== "/" && (
              <Tooltip title={"Vissza"}>
                <IconButton onClick={() => navigate(-1)} size="small">
                  <ArrowBackIosOutlined />
                </IconButton>
              </Tooltip>
            )}
            <Box display="flex" alignItems="center">
              <Typography variant="h3">{headerName || title}</Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gridGap={8}>
            <Box>{headerButtons}</Box>
          </Box>
        </Box>
        <Box
          className={classes.content}
          style={{
            marginLeft: 220,
            width: "calc(100% - 220px)",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
