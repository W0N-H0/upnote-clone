"use client";

import Input from "@/components/common/Input";
import { IoIosSearch } from "react-icons/io";

const SearchBar: React.FC = () => {
  return (
    <div className="flex relative items-center">
      <IoIosSearch
        size="28"
        color="#878787"
        className="absolute z-10 p-[2px] translate-x-2"
      />
      <Input
        type="text"
        placeholder="Search"
        className="pl-10 h-[80%] w-[200px]"
      ></Input>
    </div>
  );
};

export default SearchBar;
