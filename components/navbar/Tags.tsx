"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import Button from "../common/Button";

const Tags: React.FC = () => {
  return (
    <div className="flex items-center hover:bg-primary/10 w-full text-[0.9em]">
      <Button className="m-0 p-0 w-[25px]">
        <MdKeyboardArrowRight color="gray" size="20" />
      </Button>
      <div className="ml-2 text-secondary font-normal cursor-pointer">TAGS</div>
    </div>
  );
};

export default Tags;
