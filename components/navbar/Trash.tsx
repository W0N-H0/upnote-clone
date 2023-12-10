"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import Button from "../common/Button";

const Trash: React.FC = () => {
  return (
    <div className="flex h-[40px] items-center hover:bg-primary/10 w-full">
      <div className="ml-[33px]  text-secondary font-normal cursor-pointer">
        TRASH
      </div>
    </div>
  );
};

export default Trash;
