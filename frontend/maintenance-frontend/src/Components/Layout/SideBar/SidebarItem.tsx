import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import theme, { COLORS } from "../../../config/constants";
import { NavLink } from "../../Router";

export type SidebarItemProps = {
  to?: string;
  text: string;
  icon?: React.ReactNode;
  className?: string;
  exact?: boolean;
  onClick?: (event: any) => void;
  activeMenuItem?: string[];
  width: number;
};

const SidebarItem = ({
  to,
  icon,
  text,
  exact,
  onClick,
  activeMenuItem,
  width,
}: SidebarItemProps) => {
  const location = useLocation();
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));

  if (to)
    return (
      <ListItem
        to={to}
        component={NavLink}
        button
        exact={exact}
        onClick={onClick}
        selected={location.pathname === to}
        style={
          activeMenuItem?.some((item) =>
            location.pathname === "/"
              ? item === "/"
              : item !== "/" && location.pathname.startsWith(item)
          )
            ? {
                backgroundColor: COLORS.white,
                color: COLORS.main,
                borderRadius: 100,
              }
            : { color: COLORS.white }
        }
      >
        <Box display="flex" alignItems="center">
          <ListItemIcon
            style={{
              color: activeMenuItem?.some((item) =>
                location.pathname === "/"
                  ? item === "/"
                  : item !== "/" && location.pathname.startsWith(item)
              )
                ? COLORS.main
                : COLORS.white,
              minWidth: "unset",
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={text}
            primaryTypographyProps={{
              style: {
                fontSize: 14,
                fontWeight: 300,
                opacity: !matchesMd && width === 80 ? 0 : 100,
                transition: "opacity 0.2s ease-in-out",
                whiteSpace: to?.startsWith("/items/") ? "initial" : "nowrap",
              },
            }}
          />
        </Box>
      </ListItem>
    );
  else {
    return (
      <ListItem
        button
        onClick={onClick}
        selected={location.pathname === to}
        style={
          activeMenuItem?.some((item) =>
            location.pathname === "/"
              ? item === "/"
              : item !== "/" && location.pathname.startsWith(item)
          )
            ? {
                backgroundColor: COLORS.white,
                color: COLORS.main,
                borderRadius: 100,
              }
            : { color: COLORS.white }
        }
      >
        <Box display="flex" alignItems="center">
          <ListItemIcon
            style={{
              color: activeMenuItem?.some((item) =>
                location.pathname === "/"
                  ? item === "/"
                  : item !== "/" && location.pathname.startsWith(item)
              )
                ? COLORS.main
                : COLORS.white,
              minWidth: "unset",
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={text}
            primaryTypographyProps={{
              style: {
                fontSize: 14,
                fontWeight: 300,
                opacity: !matchesMd && width === 80 ? 0 : 100,
                transition: "opacity 0.2s ease-in-out",
              },
            }}
          />
        </Box>
      </ListItem>
    );
  }
};

export default SidebarItem;
