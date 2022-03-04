import { Box, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { COLORS } from "../../../shared/common/constants";
import NavLink from "../NavLink";

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
                backgroundColor: COLORS.main,
                color: COLORS.orange,
                borderRadius: 100,
              }
            : { color: COLORS.white }
        }
      >
        <Box display="flex" alignItems="center" gridGap={16}>
          <ListItemIcon
            style={{
              color: activeMenuItem?.some(
                (item) =>
                  location.pathname === "/"
                    ? item === "/"
                    : item !== "/" &&
                      location.pathname.startsWith(
                        item
                      ) /*location.pathname === item*/
              )
                ? COLORS.orange
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
                opacity: 100,
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
        <Box display="flex" alignItems="center" gridGap={16}>
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
                opacity: 100,
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
