import { useState } from "react";
import { NavBtn } from "../NavBtn";

export const NavDropdown = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="d-inline-block"
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="dropdown">
        <NavBtn
          style={open ? { boxShadow: "0 5px 0 -1px #7749F8" } : {}}
          className="dropdown-toggle"
        >
          {title}
        </NavBtn>
        <ul
          style={{ width: "fit-content", display: open ? "block" : "none" }}
          className={`dropdown-menu dropdown-menu-end overflow-hidden mx-auto shadow-lg border-0 rounded-2 p-0`}
        >
          {children}
        </ul>
      </div>
    </div>
  );
};
