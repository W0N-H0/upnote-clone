import { useState } from "react";
import Button from "@/components/common/Button";
import Image from "next/image";
import notebookEmpty from "@/public/assets/notebook-empty.png";
import CreateNotebook from "@/components/createNotebook/CreateNotebook";
import useModalStore from "@/store/modalStore";

const EmptyPage: React.FC = () => {
  const { isModalOpen, openModal, closeModal } = useModalStore();

  return (
    <div className="flex flex-col relative w-screen h-full justify-center items-center z-50">
      <Image
        src={notebookEmpty}
        alt="notebookEmpty image"
        width={100}
        height={100}
        quality={100}
      ></Image>
      <span className="text-primary/70">
        you can organize notes of same topic into notebooks.
      </span>
      <Button
        className="bg-transparent text-secondary font-semibold"
        onClick={openModal}
      >
        Create New Notebook
      </Button>
      {isModalOpen && (
        <div className="z-50 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div
            onClick={closeModal}
            className="absolute top-0 left-0 w-full h-full"
          ></div>
          <CreateNotebook />
        </div>
      )}
    </div>
  );
};

export default EmptyPage;
