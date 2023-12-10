"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import Button from "../common/Button";
import { LuPlus } from "react-icons/lu";

const Notebooks: React.FC = () => {
  return (
    <div className="flex items-center hover:bg-primary/10">
      <Button className="m-0 p-0 w-[25px]">
        <MdKeyboardArrowRight color="gray" size="20" />
      </Button>
      <div className="ml-2 text-secondary font-normal cursor-pointer">
        NOTEBOOKS
      </div>
      <Button className="ml-16 w-[25px] mb-[1px] ">
        <LuPlus color="#007bc7" size="20" />
      </Button>
    </div>
  );
};

export default Notebooks;
