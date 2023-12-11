"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import Button from "../common/Button";
import { LuPlus } from "react-icons/lu";
import useNotebookStore from "@/store/useNotebookStore";
import { getCoverImageUrl } from "@/utils/getCoverImageUrl";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Notebooks: React.FC = () => {
  const { notebooks } = useNotebookStore();
  const [isOpen, setIsOpen] = useState(false); // 아코디언 열림 상태를 관리하는 상태 변수
  const router = useRouter();

  // 노트북 클릭시 노트북상세 페이지로 이동하는 핸들러함수
  const handleNotebookClick = (id: number) => {
    router.push(`/notebooks/${id}`); // 클릭한 노트의 ID를 사용하여 해당 노트의 페이지로 이동
  };

  // 아이콘 클릭 시 아코디언 열림 상태를 토글하는 함수
  const handleIconClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      <div className="flex items-center hover:bg-primary/10 text-[0.9em]">
        <Button className="m-0 p-0 w-[25px]" onClick={handleIconClick}>
          {isOpen ? (
            <MdKeyboardArrowDown color="gray" size="20" />
          ) : (
            <MdKeyboardArrowRight color="gray" size="20" />
          )}
        </Button>
        <div className="ml-2 text-secondary font-normal cursor-pointer">
          NOTEBOOKS
        </div>
        <Button className="ml-16 w-[25px] mb-[1px] ">
          <LuPlus color="#007bc7" size="20" />
        </Button>
      </div>
      {isOpen && (
        <div className="pl-8 text-[0.9em]">
          {notebooks.map((notebook) => (
            <div
              className="flex mb-3 items-center cursor-pointer"
              key={notebook.id}
              onClick={() => handleNotebookClick(notebook.id)}
            >
              <Image
                src={getCoverImageUrl(notebook.imageIndex)}
                width={22}
                height={40}
                alt={notebook.name}
                className="rounded-sm"
              />
              <div className="px-2 truncate overflow-ellipsis">
                {notebook.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Notebooks;
