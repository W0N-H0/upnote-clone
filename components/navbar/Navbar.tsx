"use client";
import React, { useState } from "react";
import Button from "../common/Button";
import Allnotes from "./Allnotes";
import Notebooks from "./Notebooks";
import Tags from "./Tags";
import Trash from "./Trash";

const Navbar: React.FC = () => {
  return (
    <section className="flex w-[13%] h-screen py-2 items-start font-light text-md border-border border-r-[1px]">
      <div className="flex flex-col whitespace-nowrap justify-center items-start">
        <Allnotes />
        <Notebooks />
        <Tags />
        <Trash />
      </div>
    </section>
  );
};

export default Navbar;
