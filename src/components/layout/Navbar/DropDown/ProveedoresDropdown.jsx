import { NavBtn } from "../NavBtn";
import { NavDropdown } from "./NavDropdown";

export const ProveedoresDropdown = () => {
  return (
    <NavDropdown title="Proveedores">
      <NavBtn type="dropdownItem" href="/proveedores">
        Lista de Proveedores
      </NavBtn>
      <NavBtn type="dropdownItem" href="/productos">
        Lista de Productos
      </NavBtn>
    </NavDropdown>
  );
};
