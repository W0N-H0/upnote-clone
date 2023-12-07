"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import Button from "../common/Button";

const Allnotes: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <Button className="m-0 p-0 w-[25px]">
        <MdKeyboardArrowRight color="gray" size="20" />
      </Button>
      <div className="ml-2">ALL notes</div>
    </div>
  );
};

export default Allnotes;
