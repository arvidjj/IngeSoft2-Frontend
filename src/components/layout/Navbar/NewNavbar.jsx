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
import { NavDropdown } from "./DropDown/NavDropdown";
import { NavDropDownItem } from "./DropDown/NavDropDownItem";


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
            <NavBtn type="base"><img src={Logo} alt="Logo de la aplicación" className="logo-img" /></NavBtn>
            <NavBtn href="/clientes">Clientes</NavBtn>
            <NavBtn href="/users">Usuarios</NavBtn>
            <NavBtn href="/servicios">Servicios</NavBtn>
            <NavBtn href="/caja">Caja</NavBtn>
            <NavBtn href="/reportes">Reportes</NavBtn>
            <NavDropdown title="pepe">
              <NavDropDownItem href="/pepe">Lista de Proveedores</NavDropDownItem>
              <NavDropDownItem href="/pepe">Lista de Productos</NavDropDownItem>

            </NavDropdown>
          </div>
          <Btn color="inherit">Login</Btn>
        </ToolbarStyled>
      </div>
    </NavbarStyled>
  );
};
