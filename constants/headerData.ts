import {
  MdMenu,
  MdArrowForwardIos,
  MdArrowBackIos,
  MdOutlineRefresh,
} from "react-icons/md";
import { FiSettings } from "react-icons/fi";

export const headerDataLeft = [
  {
    tooltip: "Hide sidebar",
    shortcut: "Ctrl⇧＼",
    icon: MdMenu,
    size: 25,
    color: "#878787",
    translateX: "20%",
  },
  {
    tooltip: "Back",
    shortcut: "Ctrl⇧[",
    icon: MdArrowBackIos,
    size: 20,
    color: "#878787",
    translateX: "50%",
  },
  {
    tooltip: "Forward",
    shortcut: "Ctrl⇧]",
    icon: MdArrowForwardIos,
    size: 20,
    color: "#878787",
    translateX: "50%",
  },
  {
    tooltip: "Sync Notes",
    icon: MdOutlineRefresh,
    size: 25,
    color: "#878787",
    translateX: "50%",
  },
];

export const headerDataRight = [
  {
    tooltip: "Settings",
    shortcut: "Ctrl＼",
    icon: FiSettings,
    size: 20,
    color: "#878787",
    translateX: "75%",
  },
];
