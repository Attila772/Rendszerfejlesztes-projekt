import {
  ArrowBackIosOutlined,
  Home,
  MoreVert,
  Search,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  colors,
  IconButton,
  InputAdornment,
  ListItemIcon,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../config/store";
import {
  FunctionSearchEntry,
  functionSearchList,
} from "../../Functions/functionSearchList";
import { getPageName } from "../../Util/getPageName";
import { useHeader } from "./HeaderContext";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Permission } from "../../types";
import { GRADIENT } from "../../config/constants";
import SideBar from "./SideBar/SideBar";

type Props = {
  children: React.ReactNode;
};

const useStyles: any = makeStyles(
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

const Layout = ({ children }: Props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { headerButtons, headerName, headerMenuItems } = useHeader();
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(matchesMd ? 80 : 200);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [selectedFunction, setSelectedFunction] = useState("");

  const [permissionList, setPermissionList] = useState<string[]>([]);

  const [availableFunctionList, setAvailableFunctionList] =
    useState<FunctionSearchEntry[]>(functionSearchList);

  const { isAuthenticated, account } = useSelector(
    (state: RootState) => state.authentication
  );

  const page = pathname.match(/^\/([^/]*)[^/]?/)?.[1] || "home";
  const title = t([`drawer.${page}`, "drawer.notFound"]);

  useEffect(() => {
    if (selectedFunction !== "") {
      navigate(selectedFunction);
      setSelectedFunction("");
    }
  }, [selectedFunction]); //eslint-disable-line

  useEffect(() => {
    if (account && account.permissions) {
      setPermissionList(
        account.permissions.find((permission: Permission) => {
          return permission.id === account.user.id;
        })?.permissions || []
      );
    }
  }, [account]);

  useEffect(() => {
    if (account.user) {
      setAvailableFunctionList(
        functionSearchList.filter((functionEntry) =>
          isFunctionAvaible(functionEntry)
        )
      );
    }
  }, [account, permissionList]); //eslint-disable-line

  function isFunctionAvaible(functionSearchEntry: FunctionSearchEntry) {
    if (account.user.isSuperAdmin) {
      return true;
    } else if (
      functionSearchEntry.needSuperAdmin &&
      account.user.isSuperAdmin
    ) {
      return true;
    } else if (
      !functionSearchEntry.needSuperAdmin &&
      userPermissionCheck(functionSearchEntry)
    ) {
      return true;
    }
    return false;
  }

  function userPermissionCheck(functionSearchEntry: FunctionSearchEntry) {
    var hasPermissions = false;
    if (functionSearchEntry.permissions.length === 0) {
      return true;
    }
    functionSearchEntry.permissions.forEach((permission) => {
      if (permissionList.includes(permission)) {
        hasPermissions = true;
      }
    });
    return hasPermissions;
  }

  if (!isAuthenticated) {
    return <>{children}</>;
  } else {
    return (
      <Box className={classes.pageWrapper}>
        <SideBar
          open={open}
          setOpen={setOpen}
          width={width}
          setWidth={setWidth}
        />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          width="100%"
        >
          {!matchesSm && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              style={{
                background: GRADIENT,
              }}
            >
              <Tooltip title={t("layout.open").toString()}>
                <IconButton
                  onClick={() => {
                    setOpen(!open);
                    setWidth(200);
                  }}
                >
                  <MenuBookIcon style={{ color: colors.common.white }} />
                </IconButton>
              </Tooltip>
              <Button
                variant="text"
                component={Link}
                to="/"
                style={{
                  color: colors.common.white,
                  fontSize: 28,
                  borderRadius: 0,
                }}
              >
                {getPageName(window.location.hostname)}
              </Button>
            </Box>
          )}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            width="100%"
            padding={
              matchesMd
                ? "24px 24px 24px calc(200px + 24px)"
                : matchesSm
                ? "24px 24px 24px calc(80px + 24px)"
                : "24px"
            }
          >
            <Box display="flex" alignItems="center">
              {pathname !== "/" && (
                <Tooltip title={t("common:button.back").toString()}>
                  <IconButton onClick={() => /*navigate.goBack()*/ {}}>
                    <ArrowBackIosOutlined />
                  </IconButton>
                </Tooltip>
              )}
              <Box display="flex" alignItems="center">
                <Typography variant="h1">{headerName || title}</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Box>{headerButtons}</Box>
              <Box width="200px">
                <Autocomplete
                  key={selectedFunction}
                  fullWidth
                  defaultValue={availableFunctionList[0]}
                  onChange={(event, value) =>
                    value && setSelectedFunction(value.target)
                  }
                  options={availableFunctionList || []}
                  getOptionLabel={(option: FunctionSearchEntry) =>
                    t(`functionSearch.${option.target}`)
                  }
                  //getOptionSelected={option => option.id === inputv.value?.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            style={{ margin: "0 0 0 8px" }}
                          >
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
              <Tooltip title={t("layout.settings").toString()}>
                <IconButton
                  onClick={(event: MouseEvent<HTMLButtonElement>) => {
                    setAnchorEl(event.currentTarget);
                  }}
                >
                  <MoreVert />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem>
                  <ListItemIcon style={{ minWidth: 48 }}>
                    {loading ? (
                      <CircularProgress style={{ width: 20, height: 20 }} />
                    ) : (
                      <Home />
                    )}
                  </ListItemIcon>
                </MenuItem>
                {headerMenuItems}
              </Menu>
            </Box>
          </Box>
          <Box
            className={classes.content}
            style={{
              marginLeft: matchesMd ? 200 : matchesSm ? 80 : 0,
              width: matchesMd
                ? `calc(100% - 200px)`
                : matchesSm
                ? `calc(100% - 80px)`
                : "100%",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    );
  }
};

export default Layout;
