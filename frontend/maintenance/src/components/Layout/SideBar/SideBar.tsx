import { Box, colors, Drawer, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Difference,
  ExitToAppOutlined,
  History,
  LocationOn,
  LockOpen,
  Star,
} from "@mui/icons-material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BuildIcon from "@mui/icons-material/Build";
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Dispatch, SetStateAction } from "react";
import { hasAuthority } from "../../../shared/common/authorization";
import { GRADIENT } from "../../../shared/common/constants";
import { AuthenticatedUser } from "../../../shared/common/rolePermissions";
import { User } from "../../types";
import SidebarItem from "./SidebarItem";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  width: number;
  setWidth: Dispatch<SetStateAction<number>>;
  removeToken: any;
  token: any;
};

const useStyles = makeStyles({
  drawer: {
    zIndex: 2,
    height: "97%",
    color: colors.common.white,
    background: GRADIENT,
    backgroundSize: "150%",
    border: "unset",
    overflowX: "hidden",
    overflowY: "hidden",
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1%",
    marginBottom: "2%",
    marginLeft: 10,
    marginRight: 20,
    borderRadius: 10,
  },
});

const SideBar = ({ open, setOpen, width, removeToken, token }: Props) => {
  const classes = useStyles();
  const authenticatedUser = token;

  return (
    <>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        variant={"permanent"}
        style={{ zIndex: 2 }}
        PaperProps={{
          className: classes.drawer,
          style: {
            width: 190,
            transition: "width 0.2s ease-in-out",
          },
        }}
      >
        <Box>
          <List style={{ padding: 12 }} onClick={() => setOpen(false)}>
            <SidebarItem
              to={`/dashboard`}
              text={"Főoldal"}
              icon={<HomeIcon />}
              activeMenuItem={["/dashboard", "/"]}
              width={width}
            />
            {hasAuthority(
              (authenticatedUser as AuthenticatedUser)?.level,
              "EMPLOYEE_GET"
            ) && (
              <SidebarItem
                to={`/employee`}
                text={"Dolgozók"}
                icon={<PersonOutlineIcon />}
                activeMenuItem={[
                  "/employee",
                  "/employee-create",
                  "employee-modify",
                ]}
                width={width}
              />
            )}
            {hasAuthority(
              (authenticatedUser as AuthenticatedUser)?.level,
              "ISSUE_GET"
            ) && (
              <SidebarItem
                to={`/issue`}
                text={"Feladatok"}
                icon={<AssignmentIndIcon />}
                activeMenuItem={["/issue", "/issue-create", "/issue-modify"]}
                width={width}
              />
            )}
            {hasAuthority(
              (authenticatedUser as AuthenticatedUser)?.level,
              "TOOL_GET"
            ) && (
              <SidebarItem
                to={`/tool`}
                text={"Eszközök"}
                icon={<BuildIcon />}
                activeMenuItem={["/tool", "/tool-create", "/tool-modify"]}
                width={width}
              />
            )}
            {hasAuthority(
              (authenticatedUser as AuthenticatedUser)?.level,
              "CATEGORY_GET"
            ) && (
              <SidebarItem
                to={`/category`}
                text={"Kategóriák"}
                icon={<Difference />}
                activeMenuItem={[
                  "/category",
                  "/category-create",
                  "/category-modify",
                ]}
                width={width}
              />
            )}
            {hasAuthority(
              (authenticatedUser as AuthenticatedUser)?.level,
              "LOCATION_GET"
            ) && (
              <SidebarItem
                to={`/location`}
                text={"Helyszínek"}
                icon={<LocationOn />}
                activeMenuItem={[
                  "/location",
                  "/location-create",
                  "/location-modify",
                ]}
                width={width}
              />
            )}
            {false &&
              hasAuthority(
                (authenticatedUser as AuthenticatedUser)?.level,
                "LOG_GET"
              ) && (
                <SidebarItem
                  to={`/log`}
                  text={"Logok"}
                  icon={<History />}
                  activeMenuItem={["/log", "/log-create", "/log-modify"]}
                  width={width}
                />
              )}
            {hasAuthority(
              (authenticatedUser as AuthenticatedUser)?.level,
              "QUALIFICATION_GET"
            ) && (
              <SidebarItem
                to={`/qualification`}
                text={"Képesítések"}
                icon={<Star />}
                activeMenuItem={[
                  "/qualification",
                  "/qualification-create",
                  "/qualification-modify",
                ]}
                width={width}
              />
            )}
            {false &&
              hasAuthority(
                (authenticatedUser as AuthenticatedUser)?.level,
                "ROLE_GET"
              ) && (
                <SidebarItem
                  to={`/privilige-level`}
                  text={"Szerepkörök"}
                  icon={<LockOpen />}
                  activeMenuItem={[
                    "/privilige-level",
                    "/privilige-level-create",
                    "/privilige-level-modify",
                  ]}
                  width={width}
                />
              )}
            {hasAuthority(
              (authenticatedUser as AuthenticatedUser)?.level,
              "SCHEDULE_GET"
            ) && (
              <SidebarItem
                to={
                  (token as User)?.level?.toString() === "2" ||
                  (token as User)?.level?.toString() === "4"
                    ? `/schedule`
                    : "/mySchedule"
                }
                text={
                  (token as User)?.level?.toString() === "2" ||
                  (token as User)?.level?.toString() === "4"
                    ? `Ütemtervek`
                    : "Beosztásom"
                }
                icon={<History />}
                activeMenuItem={["/schedule", "/my-schedule"]}
                width={width}
              />
            )}
          </List>
        </Box>
        <Box style={{ marginBottom: 5 }}>
          <SidebarItem
            text={"Logout"}
            onClick={removeToken}
            icon={<ExitToAppOutlined />}
            width={width}
          />
        </Box>
      </Drawer>
    </>
  );
};

export default SideBar;
