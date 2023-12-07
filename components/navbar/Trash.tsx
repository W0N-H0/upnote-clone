"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import Button from "../common/Button";

const Trash: React.FC = () => {
  return (
    <div className="flex h-[40px] items-center">
      <div className="ml-7  text-secondary font-normal">TRASH</div>
    </div>
  );
};

export default Trash;
