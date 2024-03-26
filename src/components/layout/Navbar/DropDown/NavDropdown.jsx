import { useState } from "react";
import { NavBtn } from "../NavBtn";

export const NavDropdown = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown" style={{ display: "inline" }}>
      <NavBtn onClick={() => setOpen(!open)}>{title}</NavBtn>
      <div className={`dropdown-menu d-block position-relative w-25`}>{children}</div>
    </div>
  );
};
