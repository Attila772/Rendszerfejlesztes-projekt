import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

const NavLink = React.forwardRef(
  (props: any, ref: React.Ref<HTMLAnchorElement>) => (
    <RouterNavLink {...props} ref={ref} />
  )
);

export default NavLink;
