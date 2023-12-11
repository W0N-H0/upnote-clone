"use client";
import Image from "next/image";
import { getCoverImageUrl } from "@/utils/getCoverImageUrl";
import { Notebook } from "@/store/useNotebookStore";

type FrameTypeViewProps = {
  handleNotebookClick: (id: number) => void;
  notebooks: Notebook[];
};

const FrameTypeView: React.FC<FrameTypeViewProps> = ({
  handleNotebookClick,
  notebooks,
}) => {
  return (
    <div className="flex py-8 px-4 items-center">
      {notebooks.map((notebook) => (
        <div
          className="cursor-pointer mx-6 relative"
          key={notebook.id}
          onClick={() => handleNotebookClick(notebook.id)}
        >
          <Image
            src={getCoverImageUrl(notebook.imageIndex)}
            width={150}
            height={120}
            alt={notebook.name}
            className="rounded-md"
          />
          <div className="text-[0.85em] absolute bottom-[1px] w-[150px] h-[30px] px-2  bg-primary/20 rounded-b-md flex items-center text-background/80 font-semibold">
            <span className="truncate overflow-ellipsis">{notebook.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FrameTypeView;
