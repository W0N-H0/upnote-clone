"use client";
import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";
import Button from "../common/Button";
import { useRouter, usePathname } from "next/navigation";

const Allnotes: React.FC = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // pathname에 "notes"가 포함되어 있으면 isSelected를 true로 설정
    if (pathname.includes("notes")) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [pathname]);

  return (
    <div
      className={`flex items-center w-full hover:bg-primary/10 ${
        isSelected ? "bg-primary/10 border-border" : null
      }`}
    >
      <Button className="m-0 p-0 w-[25px]">
        {isSelected ? (
          <MdKeyboardArrowDown color="gray" size="20" />
        ) : (
          <MdKeyboardArrowRight color="gray" size="20" />
        )}
      </Button>
      <div
        className="ml-2 cursor-pointer"
        onClick={() => {
          router.push("/notes");
        }}
      >
        <div className="flex justify-center items-center">
          <IoDocumentsOutline className="mr-2" size="20" />
          ALL notes
        </div>
      </div>
    </div>
  );
};

export default Allnotes;
