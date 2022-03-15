import { Box, colors, Drawer, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Difference,
  ExitToAppOutlined,
  History,
  LocationOn,
  LockOpen,
  Star,
  Sync,
} from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import { Dispatch, SetStateAction } from "react";
import { GRADIENT } from "../../../shared/common/constants";
import SidebarItem from "./SidebarItem";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BuildIcon from "@mui/icons-material/Build";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  width: number;
  setWidth: Dispatch<SetStateAction<number>>;
  removeToken: any;
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

const SideBar = ({ open, setOpen, width, removeToken }: Props) => {
  const classes = useStyles();

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
            <SidebarItem
              to={`/issue`}
              text={"Feladatok"}
              icon={<AssignmentIndIcon />}
              activeMenuItem={["/issue", "/issue-create", "/issue-modify"]}
              width={width}
            />
            <SidebarItem
              to={`/tool`}
              text={"Eszközök"}
              icon={<BuildIcon />}
              activeMenuItem={["/tool", "/tool-create", "/tool-modify"]}
              width={width}
            />
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
            <SidebarItem
              to={`/interval`}
              text={"Intervallumok"}
              icon={<Sync />}
              activeMenuItem={[
                "/interval",
                "/interval-create",
                "/interval-modify",
              ]}
              width={width}
            />
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
            <SidebarItem
              to={`/log`}
              text={"Logok"}
              icon={<History />}
              activeMenuItem={["/log", "/log-create", "/log-modify"]}
              width={width}
            />
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
            <SidebarItem
              to={`/privilige-level`}
              text={"Hozzáfárási szintek"}
              icon={<LockOpen />}
              activeMenuItem={[
                "/privilige-level",
                "/privilige-level-create",
                "/privilige-level-modify",
              ]}
              width={width}
            />
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
