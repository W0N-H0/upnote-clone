import Input from "../common/Input";
import Button from "../common/Button";
import {
  MdMenu,
  MdArrowForwardIos,
  MdArrowBackIos,
  MdOutlineRefresh,
} from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { FiSettings } from "react-icons/fi";

const Header: React.FC = () => {
  return (
    <header className="flex w-full h-full px-2 items-center gap-2 border-border border-b-[1px]">
      <div className="flex justify-center items-center gap-3 px-4">
        <MdMenu size="25" color="#878787" className="mr-1 cursor-pointer" />
        <MdArrowBackIos size="20" color="#878787" className="cursor-pointer" />
        <MdArrowForwardIos
          size="20"
          color="#878787"
          className="cursor-pointer"
        />
        <MdOutlineRefresh
          size="25"
          color="#878787"
          className="cursor-pointer"
        />
      </div>

      <div className="flex relative items-center w-[20%]">
        <IoIosSearch
          size="28"
          color="#878787"
          className="absolute z-10 p-[2px] translate-x-2"
        />
        <Input type="text" placeholder="Search" className="pl-10"></Input>
      </div>

      <div className="flex ml-auto items-center px-4 gap-3">
        <Button className="m-1">New Note</Button>
        <FiSettings size="30" color="#878787" className="cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
