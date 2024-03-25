import { ButtonBase } from "../../../bottons/styles/ButtonBase";

export const NavButton = {
  ...ButtonBase,
  color: "inherit",
  border: "none",
  padding: "2em 1.5em",
  borderRadius: "0",
  "&:hover": {
    backgroundColor: "white",
    boxShadow: "0 10px 0 -1px #7749F8",
    color: "#7749F8",

    borderColor: `#EDDEFF`,
  },
};
