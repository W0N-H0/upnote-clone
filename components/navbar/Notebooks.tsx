"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import Button from "../common/Button";

const Notebooks: React.FC = () => {
  return (
    <div className="flex items-center">
      <Button className="m-0 p-0 w-[25px]">
        <MdKeyboardArrowRight color="gray" size="20" />
      </Button>
      <div className="ml-2 text-secondary font-normal">NOTEBOOKS</div>
    </div>
  );
};

export default Notebooks;
