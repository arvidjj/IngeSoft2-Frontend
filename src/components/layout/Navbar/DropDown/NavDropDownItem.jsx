import { Link } from "react-router-dom";
import { NavBtn } from "../NavBtn";

export const NavDropDownItem = ({ href, children, ...props }) => {
  return (
      <center>
      <NavBtn dropdownItem href={href}>{children}</NavBtn>
      </center>
  );
};
