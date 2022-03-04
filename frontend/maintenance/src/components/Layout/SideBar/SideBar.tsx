import { Box, colors, Drawer, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExitToAppOutlined } from "@mui/icons-material";
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
              text={"Home"}
              icon={<HomeIcon />}
              activeMenuItem={["/dashboard"]}
              width={width}
            />
            <SidebarItem
              to={`/employees`}
              text={"Employees"}
              icon={<PersonOutlineIcon />}
              activeMenuItem={["/employees"]}
              width={width}
            />
            <SidebarItem
              to={`/issues`}
              text={"Issues"}
              icon={<AssignmentIndIcon />}
              activeMenuItem={["/issues"]}
              width={width}
            />
            <SidebarItem
              to={`/tools`}
              text={"Tools"}
              icon={<BuildIcon />}
              activeMenuItem={["/tools"]}
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
