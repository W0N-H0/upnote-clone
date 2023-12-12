"use client";
import Image from "next/image";
import { getCoverImageUrl } from "@/utils/getCoverImageUrl";
import { Notebook } from "@/store/useNotebookStore";
import useModalStore from "@/store/modalStore";
import { useState } from "react";
import Button from "@/components/common/Button";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import CreateNotebook from "@/components/createNotebook/CreateNotebook";
import useNotebookStore from "@/store/useNotebookStore";
import useNoteStore from "@/store/useNoteStore";

type FrameTypeViewProps = {
  handleNotebookClick: (id: number) => void;
  notebooks: Notebook[];
};

const FrameTypeView: React.FC<FrameTypeViewProps> = ({
  handleNotebookClick,
  notebooks,
}) => {
  const { isModalOpen } = useModalStore();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedNotebook, setSelectedNotebook] = useState<
    Notebook | undefined
  >(undefined);
  const { deleteNotebook } = useNotebookStore();
  const { notes, deleteNote } = useNoteStore();

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

      // 해당 노트북에 속한 모든 노트들을 notes에서도 삭제
      notes.forEach((note) => {
        if (note.notebook === notebook.id) {
          deleteNote(note.id);
        }
      });
    }
  };

  return (
    <div
      className={`relative grid grid-cols-6 py-8 px-8 gap-8 items-center ${
        isModalOpen && "-z-10"
      }`}
    >
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
          className="cursor-pointer mx-6 relative"
          key={notebook.id}
          onClick={() => handleNotebookClick(notebook.id)}
        >
          <div className="relative group">
            <Image
              src={getCoverImageUrl(notebook.imageIndex)}
              width={150}
              height={120}
              alt={notebook.name}
              className="rounded-md w-full"
            />
            <Button
              className="absolute top-2 left-2 bg-primary/40 text-white px-2 rounded-[9999px] opacity-0 group-hover:opacity-100 hover:bg-primary/70 transition-opacity duration-200"
              onClick={(e) => {
                e.stopPropagation();
                handNotebookDelete(notebook);
              }}
            >
              <IoTrashOutline size={23} />
            </Button>
            <Button
              className="absolute top-2 right-2 bg-primary/40 text-white px-2 rounded-[9999px] opacity-0 group-hover:opacity-100 hover:bg-primary/70 transition-opacity duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setIsUpdateModalOpen(true);
                setSelectedNotebook(notebook);
              }}
            >
              <MdOutlineModeEdit size={23} />
            </Button>
          </div>
          <div className="text-[0.85em] absolute bottom-[1px] w-full h-[30px] px-2 bg-primary/20 rounded-b-md flex items-center text-background/80 font-semibold">
            <span className="truncate overflow-ellipsis">{notebook.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FrameTypeView;
