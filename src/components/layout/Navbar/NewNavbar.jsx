import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material";
import { AppBarStyle } from "./styles/AppBarStyle";
import { ToolbarStyle } from "./styles/ToolbarStyle";
import { Btn } from "../../bottons/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../../assets/logo.png";
import { NavBtn } from "./NavBtn";

const NavbarStyled = styled(AppBar)(AppBarStyle);

const ToolbarStyled = styled(Toolbar)(ToolbarStyle);

export const NewNavbar = () => {
  return (
    <NavbarStyled position="static">
      <div className="nav-container">
        <ToolbarStyled>
          <div>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <NavBtn type="nav"><img src={Logo} alt="Logo de la aplicación" className="logo-img" /></NavBtn>
            <NavBtn type="nav">asdfasfd</NavBtn>
            <NavBtn type="nav">asdfasfd</NavBtn>
          </div>
          <Btn color="inherit">Login</Btn>
        </ToolbarStyled>
      </div>
    </NavbarStyled>
  );
};
