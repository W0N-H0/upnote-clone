"use client";
import Image from "next/image";
import { getCoverImageUrl } from "@/utils/getCoverImageUrl";
import { Notebook } from "@/store/useNotebookStore";

type ListTypeViewProps = {
  handleNotebookClick: (id: number) => void;
  notebooks: Notebook[];
};

const ListTypeView: React.FC<ListTypeViewProps> = ({
  handleNotebookClick,
  notebooks,
}) => {
  return (
    <div className="">
      {notebooks.map((notebook) => (
        <div
          className="flex w-full py-2 px-9 items-center cursor-pointer border-border border-b-[1px]"
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
        </div>
      ))}
    </div>
  );
};

export default ListTypeView;
