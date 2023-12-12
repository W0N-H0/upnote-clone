"use client";
import { useState } from "react";
import useNotebookStore from "@/store/useNotebookStore";
import { useRouter } from "next/navigation";
import { LuPlus } from "react-icons/lu";
import SearchBar from "./_components/SearchBar";
import ViewSelectBar from "./_components/ViewSelectBar";
import Button from "@/components/common/Button";
import FrameTypeView from "./_components/FrameTypeView";
import ListTypeView from "./_components/ListTypeView";

const Notebooks: React.FC = () => {
  const { notebooks } = useNotebookStore();
  const [isFrameType, setIsFrameType] = useState<Boolean>(true);
  const router = useRouter();

  // 노트북 클릭시 노트북상세 페이지로 이동하는 핸들러함수
  const handleNotebookClick = (id: number) => {
    router.push(`/notebooks/${id}`); // 클릭한 노트의 ID를 사용하여 해당 노트의 페이지로 이동
  };

  // 노트북 list view type을 설정해주는 핸들러함수
  const handleViewSelectClick = (boolean: Boolean) => {
    setIsFrameType(boolean);
  };

  return (
    <div className="w-full h-full font-light ">
      <div className="flex justify-between bg-primary/5 border-border border-b-[1px]">
        <div className="flex py-2 px-10">
          <h1>Notebooks</h1>
          <span className="ml-2 text-primary/50">({notebooks.length})</span>
        </div>
        <div className="flex">
          <ViewSelectBar
            handleViewSelectClick={handleViewSelectClick}
            isFrameType={isFrameType}
          />
          <SearchBar />
          <Button className="mx-4 w-[25px] mb-[1px] ">
            <LuPlus color="gray" size="22" />
          </Button>
        </div>
      </div>

      {isFrameType ? (
        <FrameTypeView
          handleNotebookClick={handleNotebookClick}
          notebooks={notebooks}
        />
      ) : (
        <ListTypeView
          handleNotebookClick={handleNotebookClick}
          notebooks={notebooks}
        />
      )}
    </div>
  );
};

export default Notebooks;
