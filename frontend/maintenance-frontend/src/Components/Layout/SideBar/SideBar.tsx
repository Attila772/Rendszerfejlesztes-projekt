import { Business, Equalizer, Home } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  List,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { COLORS, GRADIENT } from "../../../config/constants";
import { RootState } from "../../../config/store";
import { getPageName } from "../../../Util/getPageName";
import SidebarItem from "./SidebarItem";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  width: number;
  setWidth: Dispatch<SetStateAction<number>>;
};

const SideBar = ({ open, setOpen, width, setWidth }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [originalHome] = useState(true);
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));

  const { account } = useSelector((state: RootState) => state.authentication);

  useEffect(() => {
    if (!matchesMd && matchesSm) {
      setWidth(80);
    }
  }, [matchesMd, matchesSm, setWidth]);

  return (
    <>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        variant={matchesSm ? "permanent" : "temporary"}
        onMouseOver={() => {
          if (!matchesMd && matchesSm) {
            setWidth(200);
          }
        }}
        onMouseOut={() => {
          if (!matchesMd && matchesSm) {
            setWidth(80);
          }
        }}
        style={{ zIndex: 2 }}
        PaperProps={{
          style: {
            width: matchesMd ? 200 : width,
            transition: "width 0.2s ease-in-out",
            zIndex: 2,
            color: COLORS.white,
            background: GRADIENT,
            backgroundSize: "150%",
            border: "unset",
            overflowX: "hidden",
            overflowY: "auto",
            display: "flex",
            justifyContent: "space-between",
          },
        }}
      >
        <Box>
          <Button
            variant="text"
            component={Link}
            to="/"
            onClick={() => setOpen(false)}
            style={{
              width: "100%",
              height: 35,
              color: COLORS.white,
              borderRadius: 0,
              marginTop: 16,
              marginBottom: 16,
              fontSize: width === 80 ? "2vw" : 24,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {getPageName(window.location.hostname)}
          </Button>
          <List style={{ padding: 12 }} onClick={() => setOpen(false)}>
            <SidebarItem
              to={`/home?original=${originalHome}`}
              text={t("home.title")}
              icon={<Home />}
              activeMenuItem={["/", "/home"]}
              width={width}
            />
            <SidebarItem
              to="/statistics"
              text={t("statistics.title")}
              icon={<Equalizer />}
              activeMenuItem={["/statistics"]}
              width={width}
            />
            <SidebarItem
              to="/my-company/users"
              text={t("drawer.my-company")}
              icon={<Business />}
              width={width}
            />
          </List>
        </Box>
        <List style={{ padding: 4 }}>
          <SidebarItem
            text={account.user.name}
            icon={<Avatar>{account.user.name[0].toUpperCase()}</Avatar>}
            width={width}
          />
        </List>
      </Drawer>
    </>
  );
};

export default SideBar;
