import { Box, colors, Drawer, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Difference,
  ExitToAppOutlined,
  History,
  LocationOn,
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
              activeMenuItem={["/dashboard"]}
              width={width}
            />
            <SidebarItem
              to={`/employees`}
              text={"Dolgozók"}
              icon={<PersonOutlineIcon />}
              activeMenuItem={["/employees"]}
              width={width}
            />
            <SidebarItem
              to={`/issues`}
              text={"Feladatok"}
              icon={<AssignmentIndIcon />}
              activeMenuItem={["/issues"]}
              width={width}
            />
            <SidebarItem
              to={`/tools`}
              text={"Eszközök"}
              icon={<BuildIcon />}
              activeMenuItem={["/tools"]}
              width={width}
            />
            <SidebarItem
              to={`/categories`}
              text={"Kategóriák"}
              icon={<Difference />}
              activeMenuItem={["/categories"]}
              width={width}
            />
            <SidebarItem
              to={`/intervals`}
              text={"Intervallumok"}
              icon={<Sync />}
              activeMenuItem={["/intervals"]}
              width={width}
            />
            <SidebarItem
              to={`/locations`}
              text={"Helyszínek"}
              icon={<LocationOn />}
              activeMenuItem={["/locations"]}
              width={width}
            />
            <SidebarItem
              to={`/logs`}
              text={"Logok"}
              icon={<History />}
              activeMenuItem={["/logs"]}
              width={width}
            />
            <SidebarItem
              to={`/qualifications`}
              text={"Képesítések"}
              icon={<Star />}
              activeMenuItem={["/qualifications"]}
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
