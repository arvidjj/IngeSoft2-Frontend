import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import { NavButton } from "./styles/NavButton";
import { NavButtonBase } from "./styles/NavButtonBase";
import { Link } from "react-router-dom";

const BtnNavbar = styled(Button)(() => NavButton);
const BtnNavbarBase = styled(Button)(() => NavButtonBase);

const BtnContent = ({ icon, children }) => {
  return (
    <>
      {children}
      {icon ? <span className="icon">{icon}</span> : <></>}
    </>
  );
};

export const NavBtn = ({ children, icon, type, href, ...props }) => {
  switch(type){
    case "base":
      return (
        <Link to={href ?? "#"}>
          <BtnNavbarBase {...props}>
            <BtnContent icon={icon}>{children}</BtnContent>
          </BtnNavbarBase>
        </Link>
      );
      default:
        return (
          <Link to={href ?? "#"}>
            <BtnNavbar {...props}>
              <BtnContent icon={icon}>{children}</BtnContent>
            </BtnNavbar>
          </Link>
        );
  }

};
