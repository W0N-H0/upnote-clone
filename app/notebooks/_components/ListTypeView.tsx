"use client";
import Image from "next/image";
import { getCoverImageUrl } from "@/utils/getCoverImageUrl";
import { Notebook } from "@/store/useNotebookStore";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import useNotebookStore from "@/store/useNotebookStore";
import { useState } from "react";
import useModalStore from "@/store/modalStore";
import CreateNotebook from "@/components/createNotebook/CreateNotebook";

type ListTypeViewProps = {
  handleNotebookClick: (id: number) => void;
  notebooks: Notebook[];
};

const ListTypeView: React.FC<ListTypeViewProps> = ({
  handleNotebookClick,
  notebooks,
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedNotebook, setSelectedNotebook] = useState<
    Notebook | undefined
  >(undefined);
  const { deleteNotebook } = useNotebookStore();

  // 노트북을 삭제하는 핸들러함수
  const handNotebookDelete = (notebook: Notebook) => {
    const notebookIndex = notebooks.findIndex((nb) => nb.id === notebook.id);
    if (notebookIndex === -1) {
      console.error("Cannot find the notebook to delete.");
      return;
    }
    const userConfirmed = window.confirm("Are you sure you want to delete it?");
    if (userConfirmed) {
      deleteNotebook(notebookIndex);
    }
  };
  return (
    <div className="">
      {isUpdateModalOpen && (
        <div className="z-50 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div
            onClick={() => {
              setIsUpdateModalOpen(false);
            }}
            className="absolute top-0 left-0 w-full h-full"
          ></div>
          <CreateNotebook
            isEditMode={true}
            notebookToEdit={selectedNotebook}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
          />
        </div>
      )}
      {notebooks.map((notebook) => (
        <div
          className="flex group w-full py-2 px-9 items-center cursor-pointer border-border border-b-[1px] hover:bg-primary/5"
          key={notebook.id}
          onClick={() => handleNotebookClick(notebook.id)}
        >
          <Image
            src={getCoverImageUrl(notebook.imageIndex)}
            width={30}
            height={30}
            alt={notebook.name}
            className="rounded-md"
          />
          <div className="text-[0.85em] w-full h-[30px] px-2 flex items-center text-primary font-light">
            <span className="truncate overflow-ellipsis">{notebook.name}</span>
          </div>
          <button
            className="hidden group-hover:block mx-4 "
            onClick={(e) => {
              e.stopPropagation();
              handNotebookDelete(notebook);
            }}
          >
            <IoTrashOutline color={"gray"} size={25} />
          </button>
          <button
            className="hidden group-hover:block "
            onClick={(e) => {
              e.stopPropagation();
              setIsUpdateModalOpen(true);
              setSelectedNotebook(notebook);
            }}
          >
            <MdOutlineModeEdit color={"gray"} size={25} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListTypeView;
