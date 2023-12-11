"use client";
import Button from "@/components/common/Button";
import Image from "next/image";
import notebookEmpty from "@/public/assets/notebook-empty.png";

const EmptyPage: React.FC = () => {
  return (
    <div className="flex flex-col w-screen h-full justify-center items-center">
      <Image
        src={notebookEmpty}
        alt="notebookEmpty image"
        width={100}
        height={100}
        quality={100}
      ></Image>
      <span className="text-primary/70">
        you can orgaize notes of same topic into notebooks.
      </span>
      <Button className="bg-transparant text-secondary font-semibold">
        Create New Notebook
      </Button>
    </div>
  );
};

export default EmptyPage;
