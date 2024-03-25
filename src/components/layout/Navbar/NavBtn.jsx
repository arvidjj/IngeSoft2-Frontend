import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import { NavButton } from "./styles/NavButton";

const BtnNavbar = styled(Button)(() => NavButton);

const BtnContent = ({ icon, children }) => {
      
    return (
      <>
        {children}
        {icon ? <span className="icon">{icon}</span> : <></>}
      </>
    );
  };
  

export const NavBtn = ({ children, icon,...props }) => {
    return (
        <BtnNavbar {...props}>
          <BtnContent  icon={icon}>
            {children}
          </BtnContent>
        </BtnNavbar>
      );
    }