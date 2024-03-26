import { NavButtonBase } from "./NavButtonBase";

export const NavButton = {
  ...NavButtonBase,
  color: "gray",
  border: "none",
  padding: "2em 1.5em",
  borderRadius: "0",

  "&.selected": {
    color: "#7749F8",
    boxShadow: "0 5px 0 -1px #7749F8",
  },

  "&:hover": {
    ...NavButtonBase["&:hover"],
    boxShadow: "0 5px 0 -1px #7749F8",
  },
};
