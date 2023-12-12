import Image from "next/image";
import { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import useNotebookStore from "@/store/useNotebookStore";
import { Notebook } from "@/store/useNotebookStore";
import useModalStore from "@/store/modalStore";

// 커버 이미지 URL 배열
const coverImages = [
  "/notebook-cover/0.png",
  "/notebook-cover/1.png",
  "/notebook-cover/2.png",
  "/notebook-cover/3.png",
  "/notebook-cover/4.png",
];

interface CreateNotebookProps {
  notebookToEdit?: Notebook;
  isEditMode?: boolean;
  setIsUpdateModalOpen?: (isOpen: boolean) => void;
}

const CreateNotebook: React.FC<CreateNotebookProps> = ({
  notebookToEdit,
  isEditMode,
  setIsUpdateModalOpen,
}) => {
  const [name, setName] = useState<string>("");
  const [selectedCoverImageIndex, setSelectedCoverImageIndex] =
    useState<number>(0);
  const { notebooks, addNotebook, updateNotebook } = useNotebookStore();
  const { isModalOpen, openModal, closeModal } = useModalStore();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCoverImageClick = (index: number) => {
    setSelectedCoverImageIndex(index);
  };

  const handleSaveNotebook = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a notebook name.");
      return;
    }

    if (isEditMode && notebookToEdit) {
      const notebookIndex = notebooks.findIndex(
        (notebook) => notebook.id === notebookToEdit.id
      );
      if (notebookIndex === -1) {
        console.error("Cannot find the notebook to edit.");
        return;
      }

      const updatedNotebook: Notebook = {
        ...notebookToEdit,
        name,
        imageIndex: selectedCoverImageIndex,
      };

      updateNotebook(notebookIndex, updatedNotebook);
      if (setIsUpdateModalOpen) {
        setIsUpdateModalOpen(false);
      }
    } else {
      const maxId = Math.max(
        ...notebooks.map((notebook) => Number(notebook.id))
      );
      const newId = isFinite(maxId) ? maxId + 1 : 1;
      const newNotebook: Notebook = {
        id: newId,
        name,
        imageIndex: selectedCoverImageIndex,
        notes: [],
      };

      addNotebook(newNotebook);
    }

    setName("");
    setSelectedCoverImageIndex(0);
    closeModal();
  };

  // update시 초기 name값 기존값으로 설정
  useEffect(() => {
    if (isEditMode && notebookToEdit) {
      setName(notebookToEdit.name);
    }
  }, []);

  return (
    <div className="z-50 flex flex-col justify-center items-center absolute bg-background rounded-md px-20 py-10 gap-10">
      <h2 className="font-bold text-[1.5em]">
        {isEditMode ? "Edit Notebook" : "Create New Notebook"}
      </h2>
      <div className="flex flex-col justify-center gap-10">
        <div className="flex items-center">
          <label className="font-semibold">Name</label>
          <input
            type="text"
            placeholder="Enter notebook name"
            className="w-full text-[0.9em] ml-10 p-2 bg-primary/10 rounded-md"
            value={name}
            onChange={handleNameChange}
          ></input>
        </div>
        <div className="flex items-center gap-4">
          <label className="font-semibold">Cover</label>
          {coverImages.map((src, index) => (
            <div
              className="relative rounded-md ml-6 cursor-pointer"
              onClick={() => handleCoverImageClick(index)}
              key={index}
            >
              <Image
                src={src}
                width={100}
                height={100}
                alt="cover img"
                className="rounded-md"
              />
              {selectedCoverImageIndex === index && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary/60 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            className="w-1/4 border-border border-[1px] px-4 py-2 rounded-md text-primary/80"
            onClick={handleSaveNotebook}
          >
            {isEditMode ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNotebook;
