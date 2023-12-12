"use client";

import Input from "../common/Input";
import Button from "../common/Button";
import HeaderTooltip from "./HeaderTooltip";
import { headerDataLeft, headerDataRight } from "@/constants/headerData";
import { IoIosSearch } from "react-icons/io";
import useNoteStore from "@/store/useNoteStore";
import useNotebookStore from "@/store/useNotebookStore";
import { Note } from "@/store/useNoteStore";
import { generateUniqueNoteId } from "@/utils/idGenerator";
import { usePathname, useParams, useRouter } from "next/navigation";
import { Notebook } from "@/store/useNotebookStore";

const Header: React.FC = () => {
  const { addNote, notes } = useNoteStore();
  const { notebooks, updateNotebook } = useNotebookStore();
  const pathname = usePathname();
  const router = useRouter();
  const { id } = useParams();

  // id와 일치하는 노트북 찾기
  const targetNotebookIndex = notebooks.findIndex(
    (notebook) => notebook.id === Number(id)
  );

  const handleAddNote = () => {
    const newNote: Note = {
      id: generateUniqueNoteId(notes),
      title: "New Note",
      body: "No additional text",
      content: `{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}`,
      createdAt: new Date(),
      notebook: Number(id),
    };
    // 노트북의 id값과 함께 노트 추가
    addNote(newNote);

    // 해당 노트북에도 노트를 추가
    if (targetNotebookIndex !== -1) {
      const updatedNotebook: Notebook = {
        ...notebooks[targetNotebookIndex],
        notes: [...notebooks[targetNotebookIndex].notes, newNote],
      };

      // 노트북을 업데이트
      updateNotebook(targetNotebookIndex, updatedNotebook);
    }

    // "/" 앤드포인트에서 new note 생성시에 "/notes 앤드포인트로 이동"
    if (pathname === "/") {
      router.push("/notes");
    }
  };

  return (
    <header className="flex w-full h-[50px] px-2 items-center gap-2 border-border border-b-[1px]">
      <div className="flex justify-center items-center gap-3 px-4">
        {headerDataLeft.map((item, index) => (
          <HeaderTooltip
            key={index}
            tooltip={item.tooltip}
            shortcut={item.shortcut}
            translateX={item.translateX}
            index={index}
          >
            <item.icon size={item.size} color={item.color} />
          </HeaderTooltip>
        ))}
      </div>

      <div className="flex relative items-center">
        <IoIosSearch
          size="28"
          color="#878787"
          className="absolute z-10 p-[2px] translate-x-2"
        />
        <Input
          type="text"
          placeholder="Search"
          className="pl-10 w-[350px]"
        ></Input>
      </div>

      <div className="flex ml-auto items-center px-4 gap-3">
        <Button
          className="m-1 px-4 hover:bg-[#0068ac] bg-secondary"
          onClick={handleAddNote}
        >
          New Note
        </Button>
        <div className="flex justify-center items-center gap-3">
          {headerDataRight.map((item, index) => (
            <HeaderTooltip
              key={index}
              tooltip={item.tooltip}
              shortcut={item.shortcut}
              translateX={item.translateX}
            >
              <item.icon size={item.size} color={item.color} />
            </HeaderTooltip>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
